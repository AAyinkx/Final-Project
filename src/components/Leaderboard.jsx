import { db } from "@/utils/dbConnection";
import { dateConverter2 } from "@/utils/handyFunctions";
import Image from "next/image";
import Link from "next/link";

export default async function Leaderboard() {
  const quizScores = await db.query(
    `SELECT users.*, users_quiz_history.*, quiz_history.*, 100 * quiz_history.correct_answers / quiz_history.number_of_questions AS score 
FROM users JOIN users_quiz_history 
ON users.clerk_id = users_quiz_history.clerk_id 
JOIN quiz_history 
ON quiz_history.id = users_quiz_history.quiz_history_id 
ORDER BY score DESC
LIMIT 10;`
  );
  const myQuizScores = quizScores.rows;
  //   console.log(myQuizScores);
  return (
    <>
      <h1>leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {myQuizScores.map((quiz, index) => (
              <tr key={quiz.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={quiz.image_src}
                          alt="Avatar Tailwind CSS Component"
                          width={200}
                          height={200}
                        />
                      </div>
                    </div>
                    <div>
                      <Link
                        href={`/community/${quiz.clerk_id}`}
                        className="font-bold"
                      >
                        {quiz.username}
                      </Link>
                      <div className="text-sm opacity-50">
                        {quiz.first_name} {quiz.last_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{quiz.quiz_topic}</td>
                <td>{quiz.score}&#37;</td>
                <td>{dateConverter2(quiz.posted_at)}</td>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </>
  );
}
