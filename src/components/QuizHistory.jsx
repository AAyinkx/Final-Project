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
      <div className=" overflow-x-auto min-w-80 w-[40vw] max-h-[60vh] rounded-md border-2 border-blue-500">
        <table className="table table-lg table-pin-rows table-pin-cols ">
          <thead>
            <tr className="text-lg font-bold text-blue-500">
              <th>Quiz Category</th>
              <th>Score</th>
              <th>Length of quiz</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {myQuizScores.map((quiz, index) => (
              <tr key={quiz.id}>
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
