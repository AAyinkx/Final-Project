import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export default function AddNewPost() {
  async function handleSubmit(formValues) {
    "use server";

    const user = await currentUser();

    const formData = {
      clerk_id: user.id,
      title: formValues.get("title"),
      content: formValues.get("content"),

      image_src: formValues.get("image_src"),
    };
    console.log(formData);

    await db.query(
      `INSERT INTO posts (clerk_id,title,content,image_src) 
      VALUES ($1,$2,$3,$4)`,
      [formData.clerk_id, formData.title, formData.content, formData.image_src]
    );

    revalidatePath("/profile");
    redirect("/profile");
  }

  return (
    <>
      <h1>Add a new post</h1>
      <div className="flex flex-row items-center justify-center">
        <form
          action={handleSubmit}
          className="flex flex-col items-center bg-green-50 w-80 my-8 border-4 border-green-700 p-4 rounded-lg"
        >
          <label htmlFor="title">Title </label>
          <input
            type="text"
            name="title"
            placeholder="what is the title of your post?"
            id="title"
            required
            className="text-orange-600 p-1"
          />

          <label htmlFor="content">Content </label>
          <textarea
            type="text"
            name="content"
            placeholder="enter your blog post here..."
            id="content"
            required
            className="text-orange-600 p-1"
          />

          <label htmlFor="image_src">post Image link </label>
          <input
            type="text"
            name="image_src"
            placeholder="please ensure you enter an image link"
            id="image_src"
            className="text-orange-600 p-1"
          />
          <button
            type="submit post"
            className="border-green-800 border-4 bg-green-100 text-zinc-900 p-2 m-4 hover:bg-green-800 hover:text-green-50
          transition duration-300 ease-in-out rounded-lg"
          >
            Submit post
          </button>
        </form>
      </div>
    </>
  );
}
