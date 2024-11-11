"use client";
//When we get our API working
import { decode } from "html-entities";

import { randomShuffle } from "@/utils/randomShuffle";
import { useEffect, useState } from "react";
export default function QuizApi5Hanifah() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledQuestions, setShuffledQuestion] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const numberOfQuestions = 5;
  const [questions, setQuestions] = useState([]); // Initialize as an empty array
  const [answers, setAnswers] = useState([]);

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
  const handleAnswerOptionClick = (isCorrect) => {
    //Checking if answer = correct_answer
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  //Solution to a hydration error that we came across
  //Credit to Ash
  useEffect(() => {
    async function waitQuestions() {
      await questions[currentQuestion];
      if (questions[currentQuestion]) {
        setAnswers([
          {
            answerText: questions[currentQuestion].correct_answer,
            isCorrect: true,
          },
          {
            answerText: questions[currentQuestion].incorrect_answers[0],
            isCorrect: false,
          },
          {
            answerText: questions[currentQuestion].incorrect_answers[1],
            isCorrect: false,
          },
          {
            answerText: questions[currentQuestion].incorrect_answers[2],
            isCorrect: false,
          },
        ]);
      }
    }
    waitQuestions();
  }, [currentQuestion, questions]);

  return (
    <div>
      {showScore ? (
        <div>
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div>
            <div>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div>
              {questions[currentQuestion] ? (
                <p>{decode(questions[currentQuestion].question)}</p>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <div>
            {randomShuffle(answers).map((answerOption, index) => {
              return (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                >
                  {decode(answerOption.answerText)}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
