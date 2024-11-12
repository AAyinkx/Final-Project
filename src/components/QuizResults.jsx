"use client";
import { useEffect } from "react";
import quizOptions from "@/lib/quizCategoriesAll.json";
import Link from "next/link";

export default function QuizResults({
  userId,
  score,
  number_of_questions,
  restartQuiz,
  categoryId,
}) {
  const wrangledCategory = quizOptions.categories;
  let categoryName;
  for (const c of wrangledCategory) {
    if (c.id == categoryId) {
      categoryName = c.name;
      // Exit the loop once the match is found
    }
  }

  function handleResults(score, userId, number_of_questions, categoryName) {
    const quizData = {
      userId: userId,
      score: score,
      number_of_questions: number_of_questions,
      category: categoryName,
    };

    const response = fetch("http://localhost:3000/api/add-quiz-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quizData }),
    });
    return response;
  }

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
            handleResults(score, userId, number_of_questions, categoryName);
          }}
        >
          Try Again
        </button>

        <span>
          <Link
            onClick={() => {
              handleResults(score, userId, number_of_questions, categoryName);
            }}
            className="py-2 px-4btn btn btn-info ml-2"
            href="/quiz-categories"
          >
            Return to Categories
          </Link>
        </span>
      </div>
    </>
  );
}
