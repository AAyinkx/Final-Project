import { randomShuffle } from "@/utils/randomShuffle";
export default async function QuizApi() {
  const numberOfQuestions = 20;
  const category = 21;
  const difficulty = "easy";
  //The url of the api is very easy to manipulate so we can easy adjust for user customisation later
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
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
