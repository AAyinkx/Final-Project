import { db } from "@/utils/dbConnection";
export async function POST(req) {
  const bodyData = await req.body;
  let json = await new Response(bodyData).json();
  console.log("hello", json);
  // Imagine db.insert is a function to insert into your database
  const quiz_id = await db.query(
    `INSERT INTO quiz_history (correct_answers,number_of_questions, quiz_topic) 
    VALUES ($1,$2,$3) RETURNING *`,
    [
      json.quizData.score,
      json.quizData.number_of_questions,
      json.quizData.category,
    ]
  );
  const data = quiz_id.rows[0].id;
  console.log(data);

  await db.query(
    `INSERT INTO users_quiz_history (clerk_id, quiz_history_id)
     VALUES ($1,$2)`,
    [json.quizData.userId, data]
  );

  return Response.json({
    message: "Body data received",
  });
}
