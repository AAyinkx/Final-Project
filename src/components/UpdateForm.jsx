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
          className="flex flex-col items-center bg-green-50 w-80 my-8 border-4 border-green-700 p-4 rounded-lg"
        >
          <label htmlFor="title">Title </label>
          <input
            type="text"
            name="title"
            placeholder="what is the title of your post?"
            id="title"
            defaultValue={title}
            required
            className="text-orange-600 p-1"
          />

          <label htmlFor="content">Content </label>
          <textarea
            type="text"
            name="content"
            placeholder="enter your post here..."
            id="content"
            defaultValue={content}
            required
            className="text-orange-600 p-1"
          />

          <label htmlFor="image_src">post Image link </label>
          <input
            type="text"
            name="image_src"
            placeholder="enter an image link"
            id="image_src"
            defaultValue={image_src}
            className="text-orange-600 p-1"
          />
          <button
            type="submit post"
            className="border-green-800 border-4 bg-green-100 text-zinc-900 p-2 m-4 hover:bg-green-800 hover:text-green-50
          transition duration-300 ease-in-out rounded-lg"
          >
            update post
          </button>
        </form>
      </div>
    </>
  );
}
