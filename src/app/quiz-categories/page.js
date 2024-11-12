"use client";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import QuizApi from "@/components/QuizApi";
import QuizApi2 from "@/components/QuizApi2";
import QuizApi3 from "@/components/QuizApi3";
import QuizApi4 from "@/components/QuizApi4";
import QuizApi5 from "@/components/QuizApi5";
import QuizApi7 from "@/components/QuizApi7";

import Result from "@/components/Result";
import { useQuiz } from "@/hooks/useQuiz";
import Image from "next/image";
import styles from "./quiz.module.css";
import backgroundImage from "@/../public/quiz-background.png";
export default function QuizCategoriesPage() {
  // const [currentUser2, setCurrentUser2] = useState("");
  const { user } = useUser();

  const {
    questions,
    currentQuestionIndex,
    score,
    quizCompleted,
    handleAnswer,
    restartQuiz,
    isLoading,
  } = useQuiz();
  // Loading state
  if (isLoading) return <p className="text-center mt-8">Loading...</p>;
  // Show final result
  if (quizCompleted) {
    return (
      <Result
        score={score}
        totalQuestions={questions.length}
        onRestart={restartQuiz}
        userId={user.id}
      />
    );
  }
  return (
    <>
      <h1>quiz categories {user.id}</h1>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-300 to-green-800 ">
        <h1 className="mb-6 text-5xl font-extrabold text-white text-transparent bg-clip-text drop-shadow-lg">
          Mind Match Quiz
        </h1>
        <QuizApi7
          questionData={questions[currentQuestionIndex]}
          handleAnswer={handleAnswer}
          currentScore={score}
        />
      </div>
    </>
  );
}
