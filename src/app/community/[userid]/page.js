import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { dateConverter } from "@/utils/handyFunctions";
import FollowButton from "@/components/FollowButton";
import ThumbButton from "@/components/ThumbButton";
export default async function UserPage({ params }) {
  const date = new Date();
  const myParams = await params;
  const userId = myParams.userid;

  const user = await currentUser();
  const follower = user.id;
  const followed = userId;

  // ===================================================
  // bio data

  const response = await db.query(
    `SELECT * FROM users WHERE clerk_id='${userId}'`
  );

  const data = response.rows[0];
  // console.log(data);

  // ==================================================
  // posts by this user
  const posts = await db.query(
    `SELECT * FROM posts WHERE clerk_id='${userId}'`
  );
  const postData = posts.rows;
  // console.log(postData);

  // ===================================================
  // handleFollow
  async function handleFollow(followerId, followedId) {
    "use server";
    await db.query(`INSERT INTO follows (following_clerk_id,followed_clerk_id)
VALUES ('${followerId}','${followedId}')`);

    revalidatePath("/profile");
    redirect("/profile");
  }
  // ===================================================
  // handleLikes

  async function handleLikes(id) {
    "use server";
    const user = await currentUser();
    const likes = await db.query(`SELECT id FROM likes WHERE post_id=${id};`);

    if (likes.rows[0]) {
      const update = await db.query(
        `UPDATE likes SET likes = likes + 1 WHERE post_id=$1 RETURNING *`,
        [id]
      );
      console.log(update.rows[0]);
      const instance = await db.query(
        `SELECT * FROM user_liked_posts WHERE clerk_id=$1 AND likes_id=$2`,
        [user.id, update.rows[0].id]
      );
      console.log(instance.rows[0]);
      if (!instance.rows[0]) {
        const usersLikes = await db.query(
          `INSERT INTO user_liked_posts(clerk_id, likes_id) VALUES ($1,$2)`,
          [user.id, update.rows[0].id]
        );
      }
    } else {
      const insert = await db.query(
        `INSERT INTO likes(post_id, likes) VALUES($1,$2)`,
        [id, 1]
      );
      const latestLike = await db.query(
        `SELECT id FROM likes ORDER BY id DESC LIMIT 1;`
      );
      console.log(latestLike.rows[0].id);
      const usersLikes = await db.query(
        `INSERT INTO user_liked_posts(clerk_id, likes_id) VALUES ($1,$2)`,
        [user.id, latestLike.rows[0].id]
      );
    }
  }

  async function Initial(id) {
    "use server";
    const startLikes = await db.query(
      `SELECT likes FROM likes WHERE post_id=$1`,
      [id]
    );
    if (startLikes.rows[0]) {
      return startLikes.rows[0].likes;
    } else {
      return 0;
    }
  }

  return (
    <>
      <h1>welcome to {myParams.userid} page</h1>
      <div className="flex justify-center">
        <Link
          className="transition-transform duration-300 transform hover:scale-105 text-white font-semibold bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3 rounded-full shadow-lg"
          href="/community"
        >
          go back ...
        </Link>
        <FollowButton
          handleFollow={handleFollow}
          follower={follower}
          followed={followed}
        />
      </div>

      <section className="flex flex-col justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center border-4 border-sky-300">
          <h2 className="text-2xl font-bold text-blue-800">
            Welcome to the profile page of {data.first_name} {data.last_name}
          </h2>
          <p className="text-gray-600 mt-2">
            Age&#58; {Math.floor((date - data.date_of_birth) / 31536000000)}
          </p>
          <Image
            alt={data.username}
            src={data.image_src}
            width={300}
            height={300}
            className="mx-auto mt-4 rounded-full border-4 border-green-400"
          />
          <p className="mt-2 text-blue-700 font-medium">
            Username&#58; {data.username}
          </p>
          <p className="text-gray-500 mt-1">Bio&#58; {data.bio} </p>
        </div>
      </section>

      {/* <h2>Posts by {user.firstName}</h2> */}
      <h2>Posts by {data.username}</h2>
      <div className="flex flex-row gap-4 m-4 flex-wrap justify-center ">
        {postData.map(async (post) => (
          <div
            className="max-w-xs min-w-72 border-4 border-green-700 p-4 rounded-lg bg-green-50"
            key={post.id}
          >
            <p>Date&#58; {dateConverter(post.posted_at)}</p>
            <div>
              <Image
                alt={post.title}
                src={post.image_src}
                // objectFit="cover"
                quality={100}
                width={100}
                height={100}
                className="border-4 border-yellow-400  rounded-lg"
              />
            </div>
            <Link
              className="font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
              href={`/community/${userId}/${post.id}`}
            >
              Title&#58; {post.title}
            </Link>
            <br />
            <div className="relative">
              <ThumbButton
                id={post.id}
                handleClicks={handleLikes}
                start={await Initial(post.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
