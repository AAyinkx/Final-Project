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
    <div id="form-container">
      <form id="the-form" action={handleSubmit}>
        <div className="form-section">
          <div className="title">
            <label htmlFor="bio">Write your Bio! ✒️</label>
          </div>
          <div className="input">
            <textarea
              type="text"
              id="bio"
              name="bio"
              placeholder="Please write a bio for your account"
              required
            />
          </div>
          <div className="input">
            <label htmlFor="image_src"> Input your image link! </label>
            <input type="text" id="image_src" name="image_src" />
          </div>
          <div className="input">
            <label htmlFor="date_of_birth"> Date of birth </label>
            <input type="date" id="date_of_birth" name="date_of_birth" />
          </div>
          {/* <div className="input">
            <label htmlFor="parent_name"> Full Name</label>
            <input
              type="text"
              id="parent_name"
              name="parent_name"
              placeholder="full name"
              required
            />
          </div> */}
        </div>
        <div className="form-section" id="submit">
          <button id="submit-button" type="submit">
            CREATE YOUR PROFILE!
          </button>
        </div>
      </form>
    </div>
  );
}
