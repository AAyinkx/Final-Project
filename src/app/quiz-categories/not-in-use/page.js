"use client";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

import QuizApi7 from "@/components/QuizApi7";

import Result from "@/components/Result";
import { useQuiz } from "@/hooks/useQuiz";
import Image from "next/image";
import styles from "./quiz.module.css";
import backgroundImage from "@/../public/quiz-background.png";
export default function NotInUse() {
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
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-green-300">
        <h1 className="mb-6 text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-sky-400 text-transparent bg-clip-text drop-shadow-lg">
          Quiz App
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
