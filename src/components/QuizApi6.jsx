"use client";
//When we get our API working
// import { questions } from "@/lib/quizQuestions";
import { randomShuffle } from "@/utils/randomShuffle";
import { useEffect, useState } from "react";

export default function QuizApi6() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledQuestions, setShuffledQuestion] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

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

  function isItCorrect(a, b) {
    return a === b;
  }

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
    setShuffledQuestion(
      randomShuffle(questions[currentQuestion].answerOptions)
    );
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
            <div>{questions[currentQuestion].questionText}</div>
          </div>
          <div>
            {shuffledQuestions.map((answerOption, index) => {
              return (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                >
                  {answerOption.answerText}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
