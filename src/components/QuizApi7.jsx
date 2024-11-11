"use client";
import { useEffect, useState } from "react";
import { shuffleArray } from "@/utils/handyFunctions";
import { formattedQuestion } from "@/utils/handyFunctions";

export default function QuizApi7({ questionData, handleAnswer, currentScore }) {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Shuffle answers when the question data changes
  useEffect(() => {
    if (questionData) {
      const answers = [
        ...questionData.incorrect_answers,
        questionData.correct_answer,
      ];
      setShuffledAnswers(shuffleArray(answers));
    }
  }, [questionData]);

  return (
    <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold mb-4">
        {formattedQuestion(questionData?.question)}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className="btn btn-accent py-2 px-4"
            onClick={() => handleAnswer(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
      <p className="mt-4">Score: {currentScore}</p>
    </div>
  );
}
