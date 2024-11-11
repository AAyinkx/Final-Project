"use client";
import { randomShuffle } from "@/utils/randomShuffle";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
export default function QuizApi4() {
  const numberOfQuestions = 10;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestions() {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
      );
      const data = response.json();

      setQuestions(data);
    }
    getQuestions();
  }, []);

  console.log(typeof questions);
  //!Quiz Setup
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [showScore, setShowScore] = useState(false);
  // const [score, setScore] = useState(0);

  // const handleAnswerOptionClick = (isCorrect) => {
  //   if (isCorrect) {
  //     setScore(score + 1);
  //   }

  //   const nextQuestion = currentQuestion + 1;
  //   if (nextQuestion < numberOfQuestions) {
  //     setCurrentQuestion(nextQuestion);
  //   } else {
  //     setShowScore(true);
  //   }
  // };

  return (
    <>
      <h1>Quiz Api</h1>

      {/* <div className="app">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{numberOfQuestions}
              </div>
              <div className="question-text">
                {questions[currentQuestion].question}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map(
                (answerOption, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.isCorrect)
                    }
                  >
                    {answerOption.answerText}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div> */}
    </>
  );
}
