"use client";
import { useEffect } from "react";
export default function QuizResults({
  userId,
  score,
  number_of_questions,
  restartQuiz,
}) {
  function handleResults(score, userId, number_of_questions) {
    const quizData = {
      userId: userId,
      score: score,
      number_of_questions: number_of_questions,
    };

    const response = fetch("http://localhost:3000/api/add-quiz-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quizData }),
    });
    return response;
    // const data = await response.json();
    // if (success) {
    //   console.log("Data submitted successfully!");
    // } else {
    //   // console.log(`Error: ${data.error}`);
    // }
  }
  // handleResults(score, userId, number_of_questions);

  // handleResults(score, userId, number_of_questions);

  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <div className="text-lg mb-4">
          You scored {score} out of {number_of_questions}
        </div>
        <button
          className="py-2 px-4btn btn btn-info mr-2"
          onClick={() => {
            restartQuiz();
            handleResults(score, userId, number_of_questions);
          }}
        >
          Try Again
        </button>

        {/* <span>
            <Link className="py-2 px-4btn btn btn-info ml-2" href="/">
              Return home
            </Link>
          </span> */}
      </div>
    </>
  );
}
