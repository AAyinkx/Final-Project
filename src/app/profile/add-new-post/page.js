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
      <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-6">
        Add a new post
      </h1>
      <div className="flex flex-row items-center justify-center">
        <form
          action={handleSubmit}
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
            required
            className="input input-bordered input-primary w-full max-w-xs bg-white"
          />

          <label htmlFor="content" className=" text-gray-700 font-bold p-3">
            Content{" "}
          </label>
          <textarea
            type="text"
            name="content"
            placeholder="enter your blog post here..."
            id="content"
            required
            className="input input-bordered input-primary w-full max-w-xs bg-white"
          />

          <label htmlFor="image_src" className=" text-gray-700 font-bold p-3">
            {" "}
            Post Image link{" "}
          </label>
          <input
            type="text"
            name="image_src"
            placeholder="please ensure you enter an image link"
            id="image_src"
            className="input input-bordered input-primary w-full max-w-xs bg-white"
          />
          <button
            type="submit post"
            className=" w-full btn glass text-white font-bold bg-sky-600 p-3 mt-4"
          >
            Submit post
          </button>
        </form>
      </div>
    </>
  );
}
