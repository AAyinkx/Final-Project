import { db } from "@/utils/dbConnection";
import Image from "next/image";
import Link from "next/link";
import { dateConverter } from "@/utils/handyFunctions";
import { auth, currentUser } from "@clerk/nextjs/server";

const date = new Date();
export default async function profilePage() {
  const user = await currentUser();

  const response = await db.query(
    `SELECT * FROM users WHERE clerk_id='${user.id}'`
  );
  const data = response.rows[0];
  // =========================================================================================================================
  // view posts made by ME
  const posts = await db.query(
    `SELECT * FROM posts WHERE clerk_id='${user.id}'`
  );
  const postData = posts.rows;
  // console.log(postData);

  // =========================================================================================================================
  // WHo you are following!
  const following = await db.query(
    `SELECT * 
    FROM follows 
    JOIN users 
    ON users.clerk_id = follows.followed_clerk_id
    WHERE follows.following_clerk_id ='${user.id}'`
  );
  const myFollows = following.rows;
  console.log(myFollows);

  // posts of the people you follow!
  const followPosts = await db.query(
    `SELECT * 
    FROM follows 
    JOIN posts 
    ON posts.clerk_id = follows.followed_clerk_id
    JOIN users 
    ON users.clerk_id = follows.followed_clerk_id
    WHERE follows.following_clerk_id ='${user.id}'`
  );
  const myFollowPosts = followPosts.rows;
  console.log(myFollowPosts);

  //
  // a propbably unnecesary JOIN due to lack of creativity on my part! I need the post primary key, which did not appear in the previous JOIN
  const extraData = await db.query(
    `SELECT * 
    FROM follows 
    JOIN posts 
    ON posts.clerk_id = follows.followed_clerk_id
    
    WHERE follows.following_clerk_id ='${user.id}'`
  );
  const myExtraData = extraData.rows;
  // console.log(myExtraData[0].id);

  return (
    <>
      <div className="my-10 flex flex-row items-center justify-center max-w-xs min-w-72 border-2 border-green-700 p-1 rounded-lg bg-red-50">
        <h1 className="flex flex-row font-bold">My Profile Page</h1>
      </div>
      <Link
        className=" hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg my-10"
        href="/profile/add-new-post"
      >
        Add a new post
      </Link>

      <section className="flex flex-col items-center justify-center ">
        <div className="max-w-xs min-w-72 border-4 border-green-700 p-4 rounded-lg bg-green-50">
          <h2>
            welcome {data?.first_name} {data?.last_name}
          </h2>
          <p>
            age&#58; {Math.floor((date - data.date_of_birth) / 31536000000)}
          </p>
          <Image
            alt={data?.username}
            src={data?.image_src}
            width={300}
            height={300}
            className=" border-green-800 border-4 rounded-2xl"
          />
          <p>username&#58; {data?.username}</p>
          <p>bio&#58; {data?.bio} </p>
        </div>
      </section>
      <div className="flex flex-row items-center justify-center max-w-xs min-w-72 border-2 border-green-700 p-1 rounded-lg bg-red-50">
        <h2 className="font-bold">Posts by {user.firstName}</h2>
      </div>

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
              href={`/profile/${post.id}`}
            >
              Topic&#58; {post.title}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center max-w-xs min-w-72 border-2 border-green-700 p-1 rounded-lg bg-red-50">
        <h2 className="font-bold">You are following&#58;</h2>
      </div>
      <div className="flex flex-row gap-4 m-4 flex-wrap justify-center ">
        {myFollows.map((user) => (
          <div
            className="max-w-xs min-w-72 border-4 border-green-700 p-4 rounded-lg bg-green-50"
            key={user.id}
          >
            <Link
              className="font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
              href={`/community/${user.clerk_id}`}
            >
              {user.first_name} {user.last_name}&#58; {user?.username}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center max-w-xs min-w-72 border-2 border-green-700 p-1 rounded-lg bg-red-50">
        <h2 className="font-bold">Post News Feed&#58;</h2>
      </div>
      <div className="my-4 border-4 border-green-700 p-4 rounded-lg bg-blue-50">
        {myFollowPosts.map((post, index) => (
          <div key={index}>
            <Link
              className="font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
              href={`/profile/${myExtraData[index].id}`}
            >
              Post on {dateConverter(post.posted_at)} by {post.username}
              titled {post.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
