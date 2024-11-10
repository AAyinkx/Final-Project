import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { dateConverter } from "@/utils/handyFunctions";
import Image from "next/image";

import Link from "next/link";
export default async function LikedPosts() {
  const user = await currentUser();
  console.log(user.id);
  const usersLikes = await db.query(
    `SELECT posts.id AS id, posts.clerk_id AS clerk_id, posts.title AS title, posts.content AS content, posts.posted_at AS posted_at, posts.image_src AS image_src FROM posts JOIN likes ON likes.post_id = posts.id JOIN user_liked_posts ON user_liked_posts.likes_id = likes.id WHERE user_liked_posts.clerk_id=$1;`,
    [user.id]
  );

  const WrangledUsersLikes = usersLikes.rows;
  console.log(WrangledUsersLikes);
  return (
    <>
      <div>
        <h1 className={`relative mt-12 mb-7 text-5xl`}>Liked Posts</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {WrangledUsersLikes.reverse().map((post) => (
            <div
              className="bg-white rounded-lg shadow-md p-4 max-w-sm w-full border border-purple-300 hover:shadow-lg transition-shadow duration-300"
              key={post.id}
            >
              <p className="text-sm text-gray-500">
                Date&#58; {dateConverter(post.posted_at)}
              </p>
              <div>
                <Image
                  alt={post.title}
                  src={post.image_src}
                  // objectFit="cover"
                  quality={100}
                  width={100}
                  height={100}
                  className="rounded-lg border-2 border-yellow-300 my-2"
                />
              </div>

              <Link
                className="text-purple-600 mt-2 font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
                href={`/profile/${post.id}`}
              >
                Topic&#58; {post.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
