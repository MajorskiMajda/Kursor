import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface EnglishTestQuizProps {
  questions: Question[];
  onFinish: () => void;
}

const EnglishTestQuiz = ({ questions, onFinish }: EnglishTestQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  const handleAnswer = (answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setFinished(true);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Get the correct answer for the current question
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  // Check if the user has selected an answer for the current question
  const userAnswer = selectedAnswers[currentQuestionIndex];

  // Calculate the percentage score
  const percentageScore = (score / questions.length) * 100;

  return (
    <div>
      <div className='flex justify-center  h-screen'>
        {!finished ? (
          <div className='w-4/6 h-fit p-12 bg-white '>
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-neutral-300-600 mt-2">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <h2 className="text-xl font-semibold text-neutral-300-800 mb-6">
              {questions[currentQuestionIndex].question}
            </h2>
            <div className="space-y-4">
              {questions[currentQuestionIndex].options.map((option, index) => {
                // Determine the color for each option
                let backgroundColor = "bg-gray-50"; // Default background color
                if (userAnswer) {
                  if (option === correctAnswer) {
                    backgroundColor = "bg-green-100"; // Correct answer (green)
                  } else if (option === userAnswer && option !== correctAnswer) {
                    backgroundColor = "bg-red-100"; // Incorrect answer (red)
                  }
                }

                return (
                  <label
                    key={index}
                    className={`flex items-center p-4 ${backgroundColor} rounded-lg border border-gray-200  cursor-pointer`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswers[currentQuestionIndex] === option}
                      onChange={() => handleAnswer(option)}
                      className="form-radio h-5 w-5 text-blue-500"
                      disabled={finished} // Disable input after submission
                    />
                    <span className="ml-3 text-neutral-300-700">{option}</span>
                  </label>
                );
              })}
            </div>
            <div className="flex justify-between mt-8">
              <button
                className="bg-gray-300 text-neutral-300-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300 disabled:opacity-50"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-300-800 mb-4">Quiz Finished</h2>
            <p className="text-lg text-neutral-300-700 mb-6">
              Your score: {score} / {questions.length} ({percentageScore.toFixed(0)}%)
            </p>
            {percentageScore >= 80 ? (
              <p className="text-green-600 text-xl font-semibold mb-6">
                🎉 Congratulations! You passed the test!
              </p>
            ) : (
              <p className="text-red-600 text-xl font-semibold mb-6">
                ❌ You failed the test. Please try again.
              </p>
            )}
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={onFinish}
            >
              Back to Test Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnglishTestQuiz;