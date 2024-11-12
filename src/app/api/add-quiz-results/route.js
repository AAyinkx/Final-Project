import { db } from "@/utils/dbConnection";
export async function POST(req) {
  const bodyData = await req.body;
  let json = await new Response(bodyData).json();
  console.log("hello", json);
  // Imagine db.insert is a function to insert into your database
  await db.query(
    `INSERT INTO quiz_history (correct_answers,number_of_questions) 
    VALUES ($1,$2)`,
    [json.quizData.score, json.quizData.number_of_questions]
  );
  // const res = await req.json();
  return Response.json({
    message: "Body data received",
  });
}
