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
          className="flex flex-col items-center bg-green-50 w-80 my-8 border-4 border-green-700 p-4 rounded-lg"
        >
          <label htmlFor="date_of_birth">date of birth </label>
          <input
            type="date"
            name="date_of_birth"
            id="date_of_birth"
            defaultValue={date_of_birth}
            required
            className="text-orange-600 p-1"
          />

          <label htmlFor="bio">Bio </label>
          <textarea
            type="text"
            name="bio"
            placeholder="enter your bio here..."
            id="bio"
            defaultValue={bio}
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
            update profile
          </button>
        </form>
      </div>
    </>
  );
}
