import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function CommentForm({ myParams }) {
  const user = await currentUser();
  async function handleSubmit(formValues) {
    "use server";

    const formData = {
      username: user.username,
      comment: formValues.get("comment"),
      posts_id: myParams.id,
    };
    console.log(formData);

    await db.query(
      `INSERT INTO comments(username, comment, posts_id) VALUES ($1,$2,$3)`,
      [formData.username, formData.comment, formData.posts_id]
    );

    revalidatePath(`/profile/${myParams.id}`);
    redirect(`/profile/${myParams.id}`);
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <form
          action={handleSubmit}
          className="flex flex-col items-center bg-gradient-to-b from-gray-100 to-gray-200 w-[28rem] my-8 border border-blue-300 p-6 rounded-lg shadow-lg"
        >
          <p className="text-gray-500 font-bold text-2xl p-3">
            Please leave a comment
          </p>

          <label htmlFor="comment" className="text-gray-700 font-bold">
            {" "}
            Comment{" "}
          </label>
          <textarea
            type="text"
            name="comment"
            placeholder="Please comment on the post ..."
            id="comment"
            required
            className="input input-bordered input-primary w-full max-w-xs bg-white p-3 h-[10vh]"
          />
          <button
            type="submit"
            className="w-full btn glass text-white font-bold bg-sky-600 p-3 mt-4"
          >
            Send Comment
          </button>
        </form>
      </div>
    </>
  );
}
