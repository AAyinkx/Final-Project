import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dateConverter } from "@/utils/handyFunctions";

export default function UpdateProfileForm({
  id,
  clerk_id,
  username,
  first_name,
  last_name,
  date_of_birth,
  bio,
  image_src,
}) {
  async function handleUpdate(formValues) {
    "use server";

    const formData = {
      id: id,
      clerk_id: clerk_id,
      username: username,
      first_name: first_name,
      last_name: last_name,
      date_of_birth: formValues.get("date_of_birth"),
      bio: formValues.get("bio"),
      image_src: formValues.get("image_src"),
    };
    console.log(formData);

    await db.query(
      `UPDATE users SET clerk_id = $1, username = $2, first_name = $3, last_name = $4, date_of_birth = $5, bio = $6, image_src = $7 WHERE id = $8 RETURNING *`,
      [
        formData.clerk_id,
        formData.username,
        formData.first_name,
        formData.last_name,
        formData.date_of_birth,
        formData.bio,
        formData.image_src,
        id,
      ]
    );

    revalidatePath(`/profile/`);
    redirect(`/profile/`);
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <form
          action={handleUpdate}
          className="flex flex-col items-center bg-gradient-to-b from-gray-100 to-gray-200 w-[28rem] my-8 border border-blue-300 p-6 rounded-lg shadow-lg"
        >
          <label
            htmlFor="date_of_birth"
            className=" text-gray-700 font-bold p-3"
          >
            Date of birth{" "}
          </label>
          <input
            type="date"
            name="date_of_birth"
            id="date_of_birth"
            defaultValue={date_of_birth}
            required
            className="input input-bordered input-primary w-full max-w-xs bg-white"
          />

          <label htmlFor="bio" className=" text-gray-700 font-bold p-3">
            Bio{" "}
          </label>
          <textarea
            type="text"
            name="bio"
            placeholder="Enter your bio here..."
            id="bio"
            defaultValue={bio}
            required
            className="input input-bordered input-primary w-full max-w-xs bg-white p-4 h-[10vh]"
          />

          <label htmlFor="image_src" className=" text-gray-700 font-bold p-3">
            Post Image link{" "}
          </label>
          <input
            type="text"
            name="image_src"
            placeholder="Enter an image link"
            id="image_src"
            defaultValue={image_src}
            className="input input-bordered input-primary w-full max-w-xs bg-white"
          />
          <button
            className=" w-full btn glass text-white font-bold bg-sky-600 p-3 mt-4"
            type="submit post"
          >
            Update profile
          </button>
        </form>
      </div>
    </>
  );
}
