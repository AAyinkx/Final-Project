import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dateConverter } from "@/utils/handyFunctions";

export default function UpdateForm({
  id,
  clerk_id,
  title,
  content,
  date,
  image_src,
}) {
  async function handleUpdate(formValues) {
    "use server";

    const formData = {
      clerk_id: clerk_id,
      title: formValues.get("title"),
      content: formValues.get("content"),
      image_src: formValues.get("image_src"),
    };
    console.log(formData);

    await db.query(
      `UPDATE posts SET clerk_id = $1, title = $2, content = $3, image_src = $4 WHERE id = $5 RETURNING *`,
      [
        formData.clerk_id,
        formData.title,
        formData.content,
        formData.image_src,
        id,
      ]
    );

    revalidatePath(`/profile/${id}`);
    redirect(`/profile/${id}`);
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <form
          action={handleUpdate}
          className="flex flex-col items-center bg-gradient-to-b from-gray-100 to-gray-200 w-[28rem] my-8 border border-blue-300 p-6 rounded-lg shadow-lg"
        >
          <label htmlFor="title" className="text-gray-700 font-bold p-3">
            Title{" "}
          </label>
          <input
            type="text"
            name="title"
            placeholder="what is the title of your post?"
            id="title"
            defaultValue={title}
            required
            className="input input-bordered input-primary w-full max-w-xs bg-white"
          />

          <label htmlFor="content" className="text-gray-700 font-bold p-3">
            Content{" "}
          </label>
          <textarea
            type="text"
            name="content"
            placeholder="enter your post here..."
            id="content"
            defaultValue={content}
            required
            className="input input-bordered input-primary w-full max-w-xs bg-white"
          />

          <label htmlFor="image_src" className="text-gray-700 font-bold p-3">
            {" "}
            Post Image link{" "}
          </label>
          <input
            type="text"
            name="image_src"
            placeholder="enter an image link"
            id="image_src"
            defaultValue={image_src}
            className="input input-bordered input-primary w-full max-w-xs bg-white"
          />
          <button
            type="submit post"
            className="w-full btn glass text-white font-bold bg-sky-600 p-3 mt-4"
          >
            Update post
          </button>
        </form>
      </div>
    </>
  );
}
