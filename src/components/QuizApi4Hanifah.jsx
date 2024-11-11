"use client";
import { useEffect, useState } from "react";

export default function QuizApi4Hanifah() {
  const numberOfQuestions = 5;
  const [questions, setQuestions] = useState([]); // Initialize as an empty array

  useEffect(() => {
    async function getQuestions() {
      const response = await fetch(
        `http://localhost:3000/api/quiz/?q=${numberOfQuestions}`
      );
      const data = await response.json();

      // Checks if data.results is an array and set it in the state
      setQuestions(data.results);
    }
    getQuestions();
  }, []);

  return (
    <>
      <h1>Quiz API</h1>

      {/* Directly access the first question if it exists */}
      {questions[0] ? (
        <p>{questions[0].question}</p>
      ) : (
        <p>Loading question...</p>
      )}
    </>
  );
}
