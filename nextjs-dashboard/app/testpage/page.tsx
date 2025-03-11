"use client"
import { useState, useEffect } from "react";
import Nav from '../home/HomePageComponents/NavBar';
import Footer from '../home/HomePageComponents/Footer';
import test from '../data/test.json'; // Import the JSON file directly
import Head from 'next/head'; // Import Next.js Head component for dynamic metadata

interface Question {
    question: string;
    options: string[];
    correctAnswer: number; // Index of the correct answer
}

const TestPage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [isTestCompleted, setIsTestCompleted] = useState(false);
    const [isTestStarted, setIsTestStarted] = useState(false);

    // Load questions from the imported JSON file
    useEffect(() => {
        setQuestions(test); // Set the questions directly from the imported JSON
    }, []);

    const handleAnswer = (answerIndex: number) => {
        setAnswers([...answers, answerIndex]);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsTestCompleted(true);
        }
    };

    const calculateScore = () => {
        return answers.filter(
            (answer, index) => answer === questions[index].correctAnswer
        ).length;
    };

    const getLevel = (score: number) => {
        if (score <= 3) return "A1";
        if (score <= 5) return "A2";
        return "B1 or higher";
    };

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const startTest = () => {
        setIsTestStarted(true);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setIsTestCompleted(false);
    };

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <p className="text-lg text-neutral-300-700">No questions available. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">

            <Nav />
            <div className="flex-1 flex justify-center items-center bg-gray-50 py-12">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    {!isTestStarted ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-neutral-300-800 mb-6">Welcome to the Test!</h2>
                            <p className="text-lg text-neutral-300-700 mb-8">
                                Click the button below to start the test. Good luck!
                            </p>
                            <button
                                onClick={startTest}
                                className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Start Test
                            </button>
                        </div>
                    ) : !isTestCompleted ? (
                        <div>
                            <div className="mb-6">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-neutral-300-600 mt-2">
                                    Question {currentQuestionIndex + 1} of {questions.length}
                                </p>
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-300-800 mb-6">
                                {questions[currentQuestionIndex]?.question}
                            </h2>
                            <div className="space-y-4">
                                {questions[currentQuestionIndex]?.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(index)}
                                        className="block w-full py-3 px-6 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition duration-200 text-left"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-neutral-300-800 mb-4">Test Completed!</h2>
                            <p className="text-lg text-neutral-300-700 mb-4">
                                Your score: <span className="font-semibold">{calculateScore()}</span>/{questions.length}
                            </p>
                            <p className="text-xl font-bold text-blue-600">
                                Your Level: {getLevel(calculateScore())}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TestPage;
