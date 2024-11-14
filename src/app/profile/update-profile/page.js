import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export const metadata = {
  title: "Mind Match - Update profile",
  description: "update your profile",
};

export default async function UpdateProfilePage() {
  const user = await currentUser();
  const response = await db.query(
    `SELECT * FROM users WHERE clerk_id='${user.id}'`
  );
  const data = response.rows[0];
  console.log(data);

  return (
    <>
      <div className="mx-11">
        <h1 className="text-4xl text-center font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-6 mt-6">
          Update Profile Form
        </h1>
        <Link
          className="transition-transform duration-300 transform hover:scale-110 text-white font-semibold bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3 rounded-full shadow-lg"
          href={`/profile`}
        >
          Go back
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center">
        <UpdateProfileForm
          id={data.id}
          clerk_id={user.id}
          username={data.username}
          first_name={data.first_name}
          last_name={data.last_name}
          image_src={data.image_src}
          date_of_birth={data.date_of_birth}
          bio={data.bio}
        />
      </div>
    </>
  );
}
