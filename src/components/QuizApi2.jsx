"use client";
import { useState, useEffect } from "react";
import { randomShuffle } from "@/utils/randomShuffle";
export default function QuizApi2() {
  const [questions, setQuestions] = useState([]);
  const numberOfQuestions = 10;
  useEffect(() => {
    async function getQuestions() {
      const response = await fetch(
        `http://localhost:3000/api/quiz/?q=${numberOfQuestions}`
        //   , {
        //   method: "POST", // Switch to POST because we're sending data
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ numberOfQuestions }), // Send the username as part of the request body in JSON format
        // }
      );
      const data = await response.json();
      setQuestions(data.results);
    }
    getQuestions();
  }, []);
  console.log({ questions });
  return (
    <>
      <h1>{questions[0]}</h1>

      {questions.map((question, index) => {
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
      })}
    </>
  );
}
