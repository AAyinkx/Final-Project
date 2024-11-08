import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateProfileForm({ clerk_id }) {
  async function handleSubmit(formValues) {
    "use server";
    const formData = {
      bio: formValues.get("bio"),
    };
    await db.query(
      `INSERT INTO users (clerk_id, bio)
          VALUES ($1, $2);
          `,
      [clerk_id, formData.bio]
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
            <label htmlFor="image"> Input your image link! </label>
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
