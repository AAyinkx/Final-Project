"use client";

import QuizApi from "@/components/QuizApi";
import QuizApi2 from "@/components/QuizApi2";
import QuizApi3 from "@/components/QuizApi3";
import QuizApi4 from "@/components/QuizApi4";
import QuizApi5 from "@/components/QuizApi5";
import QuizApi7 from "@/components/QuizApi7";
import Result from "@/components/Result";
import { useQuiz } from "@/hooks/useQuiz";
export default function QuizCategoriesPage() {
  const {
    questions,
    currentQuestionIndex,
    score,
    quizCompleted,
    handleAnswer,
    restartQuiz,
    isLoading,
  } = useQuiz();

  // Show final result
  if (quizCompleted) {
    return (
      <Result
        score={score}
        totalQuestions={questions.length}
        onRestart={restartQuiz}
      />
    );
  }
  return (
    <>
      <h1>quiz categories</h1>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="mb-6 font-bold text-3xl">Quiz App</h1>
        <QuizApi7
          questionData={questions[currentQuestionIndex]}
          handleAnswer={handleAnswer}
          currentScore={score}
        />
      </div>
    </>
  );
}
