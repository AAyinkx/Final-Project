"use client";
import { useState, useEffect } from "react";
import { randomShuffle } from "@/utils/randomShuffle";
export default function QuizApi3() {
  // const [questions, setQuestions] = useState([]);
  const numberOfQuestions = 20;

  const getQuestions = async () => {
    const response = await fetch(
      "https://the-trivia-api.com/api/questions?limit=10"
    );

    const questions = await response.json();

    return questions;
  };

  const [questions, setQuestions] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const remainingNumberOfQuestions = questions.length - currentQuestionIndex;
  useEffect(() => {
    getQuestions().then((res) => setQuestions(res));
  }, []);

  // console.log({ questions });
  return (
    <>
      <h1>{questions[0]}</h1>

      {/* {questions.map((question, index) => {
        let answers = [
          question.correctAnswer,
          question.incorrectAnswers[0],
          question.incorrectAnswers[1],
          question.incorrectAnswers[2],
        ];
        let shuffledAnswers = randomShuffle(answers);
        return (
          <div key={index}>
            <h1>Question&#58; {question.question}</h1>

            <p>Answer&#58; {question.correctAnswer}</p>
            <p>{shuffledAnswers[0]}</p>
            <p>{shuffledAnswers[1]}</p>
            <p>{shuffledAnswers[2]}</p>
            <p>{shuffledAnswers[3]}</p>
          </div>
        );
      })} */}
    </>
  );
}
