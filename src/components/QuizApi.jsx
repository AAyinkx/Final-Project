import { randomShuffle } from "@/utils/randomShuffle";
import { decode } from "html-entities";

export default async function QuizApi() {
  const numberOfQuestions = 10;
  const category = 21;
  const difficulty = "easy";
  //The url of the api is very easy to manipulate so we can easy adjust for user customisation later
  const response = await fetch(
    `http://localhost:3001/api/quiz/?q=${numberOfQuestions}`
  );
  const data = await response.json();
  const wrangledData = data.results;
  console.log(wrangledData);

  return (
    <>
      <h1>Quiz Api</h1>

      {wrangledData.map((question, index) => {
        let answers = [
          question.correct_answer,
          question.incorrect_answers[0],
          question.incorrect_answers[1],
          question.incorrect_answers[2],
        ];
        let shuffledAnswers = randomShuffle(answers);
        return (
          <div key={index}>
            <h1>Question&#58; {decode(question.question)}</h1>

            <p>Answer&#58; {decode(question.correct_answer)}</p>
            <p>{decode(shuffledAnswers[0])}</p>
            <p>{decode(shuffledAnswers[1])}</p>
            <p>{decode(shuffledAnswers[2])}</p>
            <p>{decode(shuffledAnswers[3])}</p>
          </div>
        );
      })}
    </>
  );
}
