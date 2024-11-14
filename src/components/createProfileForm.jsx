import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateProfileForm({
  clerk_id,
  username,
  first_name,
  last_name,
}) {
  async function handleSubmit(formValues) {
    "use server";
    const formData = {
      bio: formValues.get("bio"),
      date_of_birth: formValues.get("date_of_birth"),
      image_src: formValues.get("image_src"),
    };
    await db.query(
      `INSERT INTO users (clerk_id, username, first_name, last_name,date_of_birth, bio, image_src)
          VALUES ($1, $2, $3, $4, $5, $6, $7);
          `,
      [
        clerk_id,
        username,
        first_name,
        last_name,
        formData.date_of_birth,
        formData.bio,
        formData.image_src,
      ]
    );

    revalidatePath("/profile");
    redirect("/profile");
  }
  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <form
          action={handleSubmit}
          className="flex flex-col items-center bg-gradient-to-b from-gray-100 to-gray-200 w-[28rem] my-8 border border-blue-300 p-6 rounded-lg shadow-lg"
        >
          <label htmlFor="bio" className=" text-gray-700 font-bold p-3">
            Bio{" "}
          </label>
          <textarea
            type="text"
            id="bio"
            name="bio"
            placeholder="Write your Bio! ✒️"
            required
            className="input input-bordered input-primary w-full max-w-xs bg-white p-3 h-[10vh]"
          />
          <label htmlFor="image_src" className=" text-gray-700 font-bold p-3">
            Post Image link{" "}
          </label>
          <input
            type="text"
            id="image_src"
            name="image_src"
            placeholder="Input your image link!"
            required
            className="input input-bordered input-primary w-full max-w-xs bg-white"
          />
          <label
            htmlFor="date_of_birth"
            className=" text-gray-700 font-bold p-3"
          >
            Date of birth{" "}
          </label>

          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            className="input input-bordered input-primary w-full max-w-xs bg-white"
          />

          <button
            className=" w-full btn glass text-white font-bold bg-sky-600 p-3 mt-4"
            type="submit post"
          >
            Create your profile
          </button>
        </form>
      </div>
    </>
  );
}
