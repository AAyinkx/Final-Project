import { db } from "@/utils/dbConnection";

import Image from "next/image";
import Link from "next/link";

export default async function CommunityPage() {
  const response = await db.query(`SELECT * FROM users`);
  const data = response.rows;
  console.log(data);

  return (
    <>
      <h1 className="mb-6 text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-sky-400 text-transparent bg-clip-text drop-shadow-lg">
        Users
      </h1>
      <div className="flex flex-row gap-4 m-4 flex-wrap justify-center ">
        {data.map((user) => (
          <div
            className="max-w-xs min-w-72 border-4 border-green-700 p-4 rounded-lg bg-green-50"
            key={user.id}
          >
            <Link
              className="font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
              href={`/community/${user.clerk_id}`}
            >
              user&#58; {user.username}
            </Link>
            <p>{user.bio}</p>
          </div>
        ))}
      </div>
    </>
  );
}
