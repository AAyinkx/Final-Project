import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import UpdateProfileForm from "@/components/UpdateProfileForm";

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
        <h1 className="font-bold my-7">Update Profile Form</h1>
        <Link
          className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg "
          href={`/profile`}
        >
          go back ...
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
