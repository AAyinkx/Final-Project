import { db } from "@/utils/dbConnection";

import { revalidatePath } from "next/cache";
//make sure redirect is from next/navigation
import { redirect } from "next/navigation";
export default async function EditBioForm({ clerk_id }) {
  const currentBio = await db.query(`SELECT * FROM users WHERE clerk_id=$1`, [
    clerk_id,
  ]);
  const WrangledCurrentBio = currentBio.rows;
  async function handleSubmit(formValues) {
    "use server";
    const formData = {
      bio: formValues.get("bio"),
    };
    await db.query(
      `UPDATE users SET bio=$1 WHERE clerk_id=$2;
          `,
      [formData.bio, clerk_id]
    );

    revalidatePath("/userprofile");
    redirect("/userprofile");
  }
  return (
    <div id="form-container">
      <form id="the-form" action={handleSubmit}>
        <div className="form-section">
          <div className="title">
            <label htmlFor="bio">
              Write your <em>New</em> Bio! ✒️
            </label>
          </div>
          <div className="input">
            <textarea
              type="text"
              id="bio"
              name="bio"
              placeholder="Please write a new bio for your account"
              defaultValue={WrangledCurrentBio[0].bio}
              required
            />
          </div>
        </div>
        <div className="form-section" id="submit">
          <button id="submit-button" type="submit">
            UPDATE YOUR BIO!
          </button>
        </div>
      </form>
    </div>
  );
}
