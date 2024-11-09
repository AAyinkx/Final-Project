import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { dateConverter } from "@/utils/handyFunctions";
import FollowButton from "@/components/FollowButton";

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

  return (
    <>
      <h1>welcome to {myParams.userid} page</h1>
      <div className="my-4 mx-2 flex flex-col gap-2">
        <Link
          className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg my-10"
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
        <div className="flex flex-col max-w-xs min-w-72 border-4 border-green-700 p-4 rounded-lg bg-green-50">
          <h2>
            welcome to the profile page of {data.first_name} {data.last_name}
          </h2>
          <p>
            age&#58; {Math.floor((date - data.date_of_birth) / 31536000000)}
          </p>
          <Image
            alt={data.username}
            src={data.image_src}
            width={300}
            height={300}
            className=" border-green-800 border-4 rounded-2xl"
          />
          <p>username&#58; {data.username}</p>
          <p>bio&#58; {data.bio} </p>
        </div>
      </section>

      {/* <h2>Posts by {user.firstName}</h2> */}
      <h2>Posts by {data.username}</h2>
      <div className="flex flex-row gap-4 m-4 flex-wrap justify-center ">
        {postData.map((post) => (
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
          </div>
        ))}
      </div>
    </>
  );
}
