"use client";
//When we get our API working
import { useUser } from "@clerk/nextjs";
import { decode } from "html-entities";
import { randomShuffle } from "@/utils/randomShuffle";
import { useEffect, useState } from "react";
import Link from "next/link";
import QuizResults from "./QuizResults";
export default function QuizApi5Hanifah({ category }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [shuffledQuestions, setShuffledQuestion] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const numberOfQuestions = 5;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const { user } = useUser();
  useEffect(() => {
    async function getQuestions() {
      const response = await fetch(
        `http://localhost:3000/api/quiz/?q=${numberOfQuestions}&c=${category}`
      );
      const data = await response.json();

      setQuestions(data.results);
    }
    getQuestions();
  }, [category]);

  //Restart the Quiz
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };
  //Handle the user clicking the button
  const handleAnswerOptionClick = (isCorrect) => {
    //Checking if answer = correct_answer
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < numberOfQuestions) {
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
          //Adds all the elemnts from the incorrect answers array to the existing contents of the array
          ...questions[currentQuestion].incorrect_answers.map((answer) => ({
            answerText: answer,
            isCorrect: false,
          })),
        ]);
      }
    }
    waitQuestions();
  }, [currentQuestion, questions]);

  return (
    <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6">
      {showScore ? (
        <QuizResults
          categoryId={category}
          userId={user.id}
          score={score}
          number_of_questions={questions.length}
          restartQuiz={restartQuiz}
        />
      ) : (
        <>
          <div>
            <progress
              className="progress progress-accent  text-center"
              value={((currentQuestion + 1) / numberOfQuestions) * 100}
              max="100"
            ></progress>
            <div>
              <span>Question {currentQuestion + 1}</span>/{numberOfQuestions}
            </div>
            <h2 className="text-lg font-bold mb-4">
              {questions[currentQuestion] ? (
                <p>{decode(questions[currentQuestion].question)}</p>
              ) : (
                <div className="text-center">
                  <span className="loading loading-dots loading-md text-teal-500"></span>
                </div>
              )}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {randomShuffle(answers).map((answerOption, index) => {
              return (
                <button
                  key={index}
                  className="btn btn-accent py-2 px-4"
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
