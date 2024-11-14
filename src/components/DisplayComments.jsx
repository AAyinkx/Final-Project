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
      <h2 className="text-4xl text-center font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-6">
        {" "}
        Comments
      </h2>
      <section className="flex flex-col items-center ">
        {commentsData.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col items-center border-gray-300 border-2 w-[28rem] m-4 p-6 rounded-lg"
          >
            <p className="font-bold text-gray-500 mb-3">
              Date&#58; {dateConverter(comment.posted_at)}
            </p>
            <p className="font-bold text-xl text-blue-700">
              Name&#58; {comment.username}
            </p>
            <p className="font-bold text-xl text-blue-700 mb-3">
              Comment&#58; {comment.comment}
            </p>
            <DeleteButton id={comment.id} handleDelete={handleDelete} />
          </div>
        ))}
      </section>
    </>
  );
}
