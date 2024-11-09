import { db } from "@/utils/dbConnection";
import DeleteButton from "./DeleteButton";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dateConverter } from "@/utils/handyFunctions";

export default async function DisplayComments({ myParams }) {
  const comments = await db.query(
    `SELECT * FROM comments WHERE posts_id=${myParams.id}`
  );
  const commentsData = comments.rows;

  // delete comments
  async function handleDelete(index) {
    "use server";
    await db.query(`DELETE FROM comments WHERE id=${index}`);

    revalidatePath(`/profile/${myParams.id}`);
    redirect(`/profile/${myParams.id}`);
  }

  return (
    <>
      <h2>comments</h2>
      <section className="flex flex-col items-center ">
        {commentsData.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col items-center border-black border-2 w-96 m-4 p-4 rounded-lg"
          >
            <p>date&#58; {dateConverter(comment.posted_at)}</p>
            <p>name&#58; {comment.username}</p>
            <p>comment&#58; {comment.comment}</p>
            <DeleteButton id={comment.id} handleDelete={handleDelete} />
          </div>
        ))}
      </section>
    </>
  );
}
