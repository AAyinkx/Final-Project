import { db } from "@/utils/dbConnection";
import Image from "next/image";
import Link from "next/link";
import { dateConverter } from "@/utils/handyFunctions";
import { auth, currentUser } from "@clerk/nextjs/server";
import QuizHistory from "@/components/QuizHistory";
import ImageComponentProfile from "@/components/ImageComponentProfile";
import ImageComponentPost from "@/components/ImageComponentPost";

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
  const quizScores = await db.query(
    `SELECT * 
FROM users 
JOIN users_quiz_history
ON users.clerk_id = users_quiz_history.clerk_id
JOIN quiz_history
ON quiz_history.id= users_quiz_history.quiz_history_id
WHERE users.clerk_id = '${user.id}';`
  );
  let quizHistory = false;
  if (quizScores.rows[0]) {
    quizHistory = true;
  }
  console.log("This is the thing" + quizHistory);
  return (
    <>
      {/* <div className="my-10 flex flex-row items-center justify-center max-w-xs min-w-72 border-2 border-green-700 p-1 rounded-lg bg-red-50">
        <h1 className="flex flex-row font-bold">My Profile Page</h1>
      </div> */}

      <div className="my-10 text-center">
        <h1 className="py-5 text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-sky-300 text-transparent bg-clip-text drop-shadow-lg">
          My Profile Page
        </h1>
      </div>

      {/* <Link
        className=" hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg my-10"
        href="/profile/add-new-post"
      >
        Add a new post
      </Link> */}
      <div className="flex justify-center">
        <Link
          href="/profile/add-new-post"
          className="transition-transform duration-300 transform hover:scale-105 text-white font-semibold bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3 rounded-full shadow-lg"
        >
          Add a new post
        </Link>
      </div>

      {/* <section className="flex flex-col items-center justify-center ">
        <div className="max-w-xs min-w-72 border-4 border-green-700 p-4 rounded-lg bg-green-50"> */}
      <section className="flex justify-center items-center mt-10">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center border-4 border-sky-300">
          <h2 className="text-2xl font-bold text-blue-800">
            Welcome {data?.first_name} {data?.last_name}
          </h2>
          <p className="text-gray-600 mt-2">
            Age&#58; {Math.floor((date - data.date_of_birth) / 31536000000)}
          </p>
          <ImageComponentProfile
            alt={data?.username}
            src={data?.image_src}
            width={300}
            height={300}
            className="mx-auto mt-4 rounded-full border-4 border-green-400"
          />
          {/* <Image
            alt={data?.username}
            src={data?.image_src}
            width={300}
            height={300}
            className="mx-auto mt-4 rounded-full border-4 border-green-400"
          /> */}
          <p className="mt-2 text-blue-700 font-medium">
            Username&#58; {data?.username}
          </p>
          <p className="text-gray-500 mt-1">Bio&#58; {data?.bio} </p>
        </div>
      </section>

      <section className="mt-10">
        {/* <div className="flex flex-row items-center justify-center max-w-xs min-w-72 border-2 border-green-700 p-1 rounded-lg bg-red-50"> */}
        <h2 className="text-4xl text-center font-extrabold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg mb-6">
          Your Posts
        </h2>

        {/* </div> */}
      </section>

      <div className="flex flex-wrap justify-center gap-6">
        {postData.map((post) => (
          <div
            className="bg-white rounded-lg shadow-md p-4 max-w-sm w-full border-2 border-blue-300 hover:shadow-xl transition-shadow duration-300"
            key={post.id}
          >
            <p className="text-sm text-gray-500">
              Date&#58; {dateConverter(post.posted_at)}
            </p>
            <div>
              <ImageComponentPost
                alt={post.title}
                src={post.image_src}
                // objectFit="cover"
                quality={100}
                width={100}
                height={100}
                className="rounded-lg border-2 border-blue-200 my-2"
              />
              {/* <Image
                alt={post.title}
                src={post.image_src}
                // objectFit="cover"
                quality={100}
                width={100}
                height={100}
                className="rounded-lg border-2 border-blue-200 my-2"
              /> */}
            </div>

            <Link
              className="text-blue-500 mt-2 font-bold hover:scale-105 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
              href={`/profile/${post.id}`}
            >
              Topic&#58; {post.title}
            </Link>
          </div>
        ))}
      </div>

      {/* <div className="flex flex-row items-center justify-center max-w-xs min-w-72 border-2 border-green-700 p-1 rounded-lg bg-red-50"> */}
      <section className="mt-10">
        <h2 className="text-4xl text-center font-extrabold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg mb-6">
          You are following&#58;
        </h2>
        {/* </div> */}
        <div className="flex flex-wrap justify-center text-center gap-6">
          {myFollows.map((user) => (
            <div
              className="p-[2px] bg-gradient-to-r from-green-300 via-blue-300 to-blue-500 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 max-w-sm w-full h-12 place-content-center"
              key={user.id}
            >
              <Link
                className="text-blue-700 font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
                href={`/community/${user.clerk_id}`}
              >
                {user.first_name} {user.last_name}&#58; {user?.username}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        {/* <div className="flex flex-row items-center justify-center max-w-xs min-w-72 border-2 border-green-700 p-1 rounded-lg bg-red-50"> */}
        <h2 className="text-4xl text-center font-extrabold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg mb-6">
          Post News Feed&#58;
        </h2>
        {/* </div> */}
        <div className="bg-blue-50 rounded-lg shadow-md p-6 mx-auto max-w-3xl border border-blue-400 max-h-48 overflow-scroll">
          {myFollowPosts.map((post, index) => (
            <div key={index} className="border-b border-sky-300 pb-4 mb-4">
              <Link
                className="text-blue-700 font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
                href={`/profile/${myExtraData[index].id}`}
              >
                Post on {dateConverter(post.posted_at)} by {post.username}
                titled {post.title}
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10 flex flex-col items-center justify-center">
        <h2 className="text-4xl text-center font-extrabold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg mb-6">
          Your Quiz History
        </h2>
        {quizHistory ? (
          <QuizHistory userId={user.id} />
        ) : (
          <Link
            href="/quiz-categories"
            className="hover:scale-105 ease-in-out transition-transform duration-300 font-bold bg-blue-800 w-fit p-0.5 bg-gradient-to-r from-green-200 to-green-400 px-6 py-3 m-2 border-2
        rounded-lg "
          >
            Take your first quiz <i className="fa-solid fa-gamepad"></i>
          </Link>
        )}
      </section>
    </>
  );
}
