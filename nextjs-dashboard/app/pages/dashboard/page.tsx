"use client"
import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { ClipLoader } from "react-spinners"; // Import the ClipLoader spinner

type Course = {
  courseName: string;
  courseCreationDate: string;
  courseExpirationDate: string;
};
type Video = {
  _id: string;
  videoTitle: string;
  videoImageLink: string;
  videoLink: string;
  courseLevel?: string; // Optional, as it may not exist in all videos
};

export default function Dashboard() {
  const [selectedLevel, setSelectedLevel] = useState<string>("Svi Kursevi");
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]); // Changed to hold course objects with dates
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state for fetching videos
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    const disableDevTools = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'i' || e.key === 'j')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('keydown', disableDevTools);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('keydown', disableDevTools);
    };
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = sessionStorage.getItem(process.env.AUTH_TOKEN || "");
        if (!token) throw new Error("Nepostojeći token.");

        const response = await fetch(`${process.env.BACKEND_URL}/api/user/courses`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Greška u pri učitavanju kurseva");

        const data = await response.json();

        // Get today's date in 'YYYY-MM-DD' format
        const today = new Date().toISOString().split('T')[0];

        // Filter out expired courses and keep track of the expired ones
        const activeCourses: Course[] = [];
        const expiredCourses: Course[] = [];

        // Split data into active and expired courses
        for (const course of data) {
          if (course.courseExpirationDate >= today) {
            activeCourses.push(course); // Active course
          } else {
            expiredCourses.push(course); // Expired course
          }
        }

        // Set active courses to state
        setCourses(activeCourses);

        if (expiredCourses.length > 0) {
          // Delete expired courses in parallel
          const deleteRequests = expiredCourses.map((expiredCourse) =>
            fetch(`${process.env.BACKEND_URL}/api/user/courses/${expiredCourse.courseName}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            })
          );

          // Wait for all delete requests to finish
          await Promise.all(deleteRequests);
        }

      } catch (error: any) {
        setError(error.message);
        console.error("Greška u pri učitavanju kurseva:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true); // Set loading state to true while fetching videos
      try {
        let allVideos: any[] = [];

        // Simulate a delay (e.g., 3 seconds)
        await new Promise(resolve => setTimeout(resolve, 500)); // 3 seconds delay

        if (selectedLevel === "Svi Kursevi") {
          // Fetch videos for all courses the user has
          for (const course of courses) {
            const response = await fetch(`${process.env.BACKEND_URL}/api/courses/${course.courseName}`);
            if (!response.ok) throw new Error("Greška u pri učitavanju video materijala");

            const data = await response.json();
            allVideos.push(...data.map((video: any) => ({ ...video, courseLevel: course.courseName }))); // Add course level to each video
          }
          setVideos(allVideos);
        } else {
          // Fetch videos for the selected course level
          const response = await fetch(`${process.env.BACKEND_URL}/api/courses/${selectedLevel}`);
          if (!response.ok) throw new Error("Greška u pri učitavanju video materijala");

          const data = await response.json();
          setVideos(data);
        }
      } catch (error: any) {
        setError(error.message);
        console.error("Greška u pri učitavanju video materijala:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching is done
      }
    };

    if (courses.length > 0) {
      fetchVideos();
    }
  }, [selectedLevel, courses]);

  // Group videos by course level
  const groupedVideos = videos.reduce((acc, video) => {
    const level = video.courseLevel || selectedLevel;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(video);
    return acc;
  }, {} as { [key: string]: any[] });

  // Get the selected course details (e.g., creation and expiration date)
  const selectedCourse = courses.find(course => course.courseName === selectedLevel);

  return (
    <div className="p-4 sm:p-6 relative min-h-screen">
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-80 z-50">
          <ClipLoader size={100} color="#3498db" />
        </div>
      )}

      {!selectedVideo ? (
        <>
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center ">Predavanja</h1>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-center sm:text-left">Filtriraj po nivou:</label>
            <Listbox value={selectedLevel} onChange={setSelectedLevel} as="div">
              {({ open }) => (
                <div className="relative w-full sm:max-w-sm mx-auto sm:mx-0">
                  <Listbox.Button className="p-2 border bg-white text-black rounded w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center">
                    {selectedLevel}
                    <svg
                      className={`w-5 h-5 ml-2 transition-transform duration-200 ${open ? "transform rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </Listbox.Button>
                  <Listbox.Options className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    <Listbox.Option key="all" value="Svi Kursevi" className="p-2 hover:bg-gray-200 cursor-pointer">
                      Svi Kursevi
                    </Listbox.Option>
                    {courses.map((course, index) => (
                      <Listbox.Option key={index} value={course.courseName} className="p-2 hover:bg-gray-200 cursor-pointer">
                        {course.courseName}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              )}
            </Listbox>
          </div>

          {selectedCourse && (
            <div className="mb-6 flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-300-800 underline">Informacije o kursu</h3>
                <p className="text-neutral-300-600 mt-2 py-2">
                  <span className="font-medium text-neutral-300-700">📅 Kreiran:</span> {new Date(selectedCourse.courseCreationDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
                <p className="text-neutral-300-600">
                  <span className="font-medium text-neutral-300-700">⏳ Ističe:</span> {new Date(selectedCourse.courseExpirationDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>
          )}

          <div className="mb-8">
            {selectedLevel === "Svi Kursevi" ? (
              Object.entries(groupedVideos).map(([level, videos]) => (
                <div key={level} className="mb-8">
                  <h3 className="text-2xl font-semibold text-left border-b-2  mb-4">{level} Kurs</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {videos.map((video: any) => (
                      <div key={video._id} className="border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer" onClick={() => setSelectedVideo(video)}>
                        <img src={video.videoImageLink} alt={video.level} className="w-full h-40 sm:h-48 object-cover" />
                        <div className="p-4 bg-white">
                          <h2 className="font-bold text-lg">{video.videoTitle}</h2>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {videos.length === 0 ? (
                  <p className="text-neutral-300-500 text-center mt-6">{error ? error : "No recordings available for the selected level."}</p>
                ) : (
                  videos.map((video: any) => (
                    <div key={video._id} className="border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer" onClick={() => setSelectedVideo(video)}>
                      <img src={video.videoImageLink} alt={video.level} className="w-full h-40 sm:h-48 object-cover" />
                      <div className="p-4 bg-white">
                        <h2 className="font-bold text-lg">{video.videoTitle}</h2>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div>
          <button onClick={() => setSelectedVideo(null)} className="px-4 py-2 font-semibold rounded-lg">← Back to all videos</button>
          <div className="flex flex-col items-center relative">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">{selectedVideo.title}</h2>
            <div className="relative w-full max-w-md sm:max-w-4xl mb-6 rounded-lg shadow-lg">
              <video controls controlsList="nodownload" className="w-full rounded-lg">
                <source src={selectedVideo.videoLink} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}