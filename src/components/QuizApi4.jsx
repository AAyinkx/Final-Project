"use client";
import { randomShuffle } from "@/utils/randomShuffle";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
export default function QuizApi4() {
  const numberOfQuestions = 10;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestions() {
      // !change port number if needed
      const response = await fetch(
        `http://localhost:3001/api/quiz/?q=${numberOfQuestions}`
      );
      const data = await response.json();
      const wrangledData = data.results;
      setQuestions([wrangledData]);
    }
    getQuestions();
  }, []);

  console.log(typeof questions);
  console.log(questions);
  //!Quiz Setup

  return (
    <>
      <h1>Quiz Api</h1>
      <p>{questions[0].type}</p>
    </>
  );
}
