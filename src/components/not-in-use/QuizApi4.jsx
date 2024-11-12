"use client";
import { randomShuffle } from "@/utils/randomShuffle";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
export default function QuizApi4() {
  const numberOfQuestions = 5;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestions() {
      // !change port number if needed
      const response = await fetch(
        `http://localhost:3000/api/quiz/?q=${numberOfQuestions}`
      );
      const data = await response.json();
      const wrangledData = data.results;
      setQuestions([wrangledData[0]]);
    }
    getQuestions();
  }, []);

  console.log(typeof questions);
  console.log(questions);
  //!Quiz Setup

  return (
    <>
      <h1>Quiz Api</h1>
      {/* {questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
        </div>
      ))} */}

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
