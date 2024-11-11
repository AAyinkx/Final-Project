import { useEffect, useRef, useState } from "react";
import { sleep } from "@/utils/handyFunctions";

const MAX_RETRY = 5;

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const firstRun = useRef(true);

  // Function to fetch quiz questions
  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      const data = await response.json();
      if (data.response_code === 0) {
        setQuestions(data.results);
        setRetryCount(0); // Reset retry count on success
      } else if (retryCount < MAX_RETRY) {
        console.warn("Refetching questions, retry count:", retryCount + 1);
        await sleep(2000);
        firstRun.current = true;
        setRetryCount(retryCount + 1);
      } else {
        alert(
          "Failed to fetch quiz questions after multiple attempts. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  // Handle user answering a question
  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setQuizCompleted(true);
    }
  };

  // Restart the quiz
  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setRetryCount(0);
    firstRun.current = true;
    fetchQuestions();
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      fetchQuestions();
    }
  }, [retryCount, fetchQuestions]);

  return {
    questions,
    currentQuestionIndex,
    score,
    quizCompleted,
    handleAnswer,
    restartQuiz,
    isLoading: !questions.length && retryCount < MAX_RETRY,
  };
};
