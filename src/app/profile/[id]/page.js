import { db } from "@/utils/dbConnection";

import Image from "next/image";
import Link from "next/link";
import { dateConverter } from "@/utils/handyFunctions";
import CommentForm from "@/components/CommentForm";
import DisplayComments from "@/components/DisplayComments";
import { notFound } from "next/navigation";
import ImageComponentPost from "@/components/ImageComponentPost";

export default async function PostIdPage({ params }) {
  const myParams = await params;
  const post = await db.query(`SELECT * FROM posts WHERE id=${myParams.id};`);
  const data = post?.rows[0];
  console.log(data);
  // ==============================
  // get clerk id and then name of post creator. I know there is an easier way of doing this but i wanted to try this way
  const my_clerkId = await db.query(
    `SELECT clerk_id FROM posts WHERE id=${myParams.id};`
  );
  const my_clerkId2 = my_clerkId.rows[0].clerk_id;
  console.log(my_clerkId2);

  const myName = await db.query(
    `SELECT username FROM users WHERE clerk_id = '${my_clerkId2}' ;`
  );

  const myUsername = myName.rows[0].username;
  console.log(myUsername);

  // ===========================
  return (
    <>
      <div className="flex flex-col mt-4 mb-5 gap-16 mx-2">
        <div>
          <Link
            className="transition-transform duration-300 transform hover:scale-105  text-white font-semibold bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3  rounded-full shadow-lg place-content-center"
            href="/profile"
          >
            Go back
          </Link>
        </div>
        <div>
          <Link
            className="hover:scale-105 ease-in-out transition-transform duration-300 font-bold bg-blue-800 w-fit p-0.5 bg-gradient-to-r from-green-200 to-green-400 px-6 py-3  border-2
            rounded-lg "
            href={`/profile/${myParams.id}/update`}
          >
            Update post entry
          </Link>
        </div>
      </div>

      <section className="flex flex-col items-center">
        <h2 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-6">
          Title&#58; {data.title}
        </h2>

        <h1 className="font-extrabold text text-2xl text-blue-900">
          Date of post&#58; {dateConverter(data.posted_at)}
        </h1>
        <h1 className="font-extrabold text text-2xl text-blue-900">
          Post author&#58; {myUsername}
        </h1>

        <div className="flex flex-col items-center gap-4 p-6 w-[70vw] min-w-[350px]">
          {/* <Image
            alt={data.title}
            src={data.image_src}
            width={300}
            height={300}
            className=" border-green-800 border-4 rounded-2xl"
          /> */}
          <ImageComponentPost
            alt={data.title}
            src={data.image_src}
            width={300}
            height={300}
            className="rounded-lg border-4 border-blue-300 my-2"
          />
          <p>{data.content}</p>
        </div>
      </section>
      <CommentForm myParams={myParams} />
      <DisplayComments myParams={myParams} />
    </>
  );
}
