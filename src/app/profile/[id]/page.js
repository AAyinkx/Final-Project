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
      <h2>post number {myParams.id}</h2>
      <div className="my-4 mx-2">
        <Link
          className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg my-10"
          href="/profile"
        >
          go back ...
        </Link>
      </div>
      <Link
        className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg "
        href={`/profile/${myParams.id}/update`}
      >
        update post entry
      </Link>

      <section className="flex flex-col items-center">
        <h1 className="font-bold">
          Date of post&#58; {dateConverter(data.posted_at)}
        </h1>
        <h1 className="font-bold">post author&#58; {myUsername}</h1>
        <h2 className="font-bold">Title&#58; {data.title}</h2>
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
            className=" border-green-800 border-4 rounded-2xl"
          />
          <p>{data.content}</p>
        </div>
      </section>
      <CommentForm myParams={myParams} />
      <DisplayComments myParams={myParams} />
    </>
  );
}
