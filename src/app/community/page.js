import { db } from "@/utils/dbConnection";

import Image from "next/image";
import Link from "next/link";

export default async function CommunityPage() {
  const response = await db.query(`SELECT * FROM users`);
  const data = response.rows;
  console.log(data);

  return (
    <>
      <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-6">
        Users
      </h1>
      <div className="flex flex-row gap-4 m-4 flex-wrap justify-center ">
        {data.map((user) => (
          <div
            className="max-w-xs w-full bg-blue-50 bg-opacity-60 p-6 rounded-lg shadow-lg border-2 border-blue-300 transform transition-transform hover:scale-105 hover:shadow-xl"
            key={user.id}
          >
            <Link
              className="block text-2xl font-bold text-blue-800 hover:text-blue-400 transition duration-300"
              href={`/community/${user.clerk_id}`}
            >
              User&#58; {user.username}
            </Link>
            <p className="mt-2 text-gray-700 font-bold">{user.bio}</p>
          </div>
        ))}
      </div>
    </>
  );
}
