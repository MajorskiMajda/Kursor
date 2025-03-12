"use client";
import React, { useState, useEffect } from "react";
import EnglishTestQuiz from "./eng";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type Test = {
  [subject: string]: Question[];
};

interface Course {
  courseName: string;
  courseCreationDate: string;
  courseExpirationDate: string;
  _id: string;
}

const TestSelectionPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]); // Holds the fetched courses
  const [testData, setTestData] = useState<{ [course: string]: Test }>({}); // Holds test data for each course
  const [selectedTest, setSelectedTest] = useState<{ course: string; subject: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch the user's courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = sessionStorage.getItem(process.env.AUTH_TOKEN || "");
        if (!token) throw new Error("Nepostojeći token.");

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/courses`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Greška u pri učitavanju kurseva");

        const data = await response.json();
        setCourses(data); // Set the fetched courses
      } catch (error: any) {
        console.error("Greška u pri učitavanju kurseva:", error);
        setError("Failed to fetch courses. Please try again later.");
      }
    };

    fetchCourses();
  }, []);

  // Dynamically load the test files based on the fetched courses
  useEffect(() => {
    const loadTestData = async () => {
      try {
        const data: { [course: string]: Test } = {};

        // Load test data for each course
        for (const course of courses) {
          const courseData = await import(`../../data/${course.courseName}.json`);
          data[course.courseName] = courseData.default;
        }

        setTestData(data);
      } catch (error) {
        console.error("Failed to load test data:", error);
        setError("Failed to load test data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (courses.length > 0) {
      loadTestData();
    }
  }, [courses]); // Re-run when `courses` changes

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading test data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (Object.keys(testData).length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No test data available.</p>
      </div>
    );
  }

  return (

    <div className=" p-8 w-full ">
      {!selectedTest ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-300-800 mb-8">Odaberite Test</h1>
          {Object.entries(testData).map(([course, subjects]) => (
            <div key={course} className="mb-8 ">
              <h2 className="text-2xl font-semibold text-left border-b-2 text-neutral-300-700 mb-4">
                {course.toUpperCase()} Testovi
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(subjects).map((subject) => (
                  <div
                    key={subject}
                    className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedTest({ course, subject })}
                  >
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">
                      {subject.charAt(0).toUpperCase() + subject.slice(1)}
                    </h3>
                    <p className="text-neutral-300-600">
                      {subjects[subject].length} questions
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EnglishTestQuiz
          questions={testData[selectedTest.course][selectedTest.subject]}
          onFinish={() => setSelectedTest(null)}
        />
      )}
    </div>

  );
};

export default TestSelectionPage;