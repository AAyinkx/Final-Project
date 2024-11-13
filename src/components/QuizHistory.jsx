import { db } from "@/utils/dbConnection";
import { dateConverter2 } from "@/utils/handyFunctions";

export default async function QuizHistory({ userId }) {
  const quizScores = await db.query(
    `SELECT * 
FROM users 
JOIN users_quiz_history
ON users.clerk_id = users_quiz_history.clerk_id
JOIN quiz_history
ON quiz_history.id= users_quiz_history.quiz_history_id
WHERE users.clerk_id = '${userId}';`
  );
  const myQuizScores = quizScores.rows.reverse();
  console.log(myQuizScores);
  return (
    <>
      <div className="overflow-x-auto w-96 max-h-48">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <th>Quiz Category</th>
              <th>Score</th>
              <th>Length of quiz</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {myQuizScores.map((quiz, index) => (
              <tr key={quiz.id}>
                <th>{index}</th>
                <td>{quiz.quiz_topic}</td>
                <td>
                  {(quiz.correct_answers / quiz.number_of_questions) * 100}&#37;
                </td>
                <td>{quiz.number_of_questions}</td>
                <td>{dateConverter2(quiz.posted_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
