"use client";
import { useState, useEffect } from "react";
import { randomShuffle } from "@/utils/randomShuffle";
export default function QuizApi2() {
  const [questions, setQuestions] = useState([]);
  const numberOfQuestions = 20;
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
      setQuestions(data);
    }
    getQuestions();
  }, []);
  console.log(questions);
  return (
    <>
      <h1>Quiz Api</h1>

      {questions.map((question, index) => {
        let answers = [
          question.correct_answer,
          question.incorrect_answers[0],
          question.incorrect_answers[1],
          question.incorrect_answers[2],
        ];
        let shuffledAnswers = randomShuffle(answers);
        return (
          <div key={index}>
            <h1>Question&#58; {question.question}</h1>

            <p>Answer&#58; {question.correct_answer}</p>
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
