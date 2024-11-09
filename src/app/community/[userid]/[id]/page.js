import { db } from "@/utils/dbConnection";
import Image from "next/image";
import Link from "next/link";
import { dateConverter } from "@/utils/handyFunctions";
import CommentForm from "@/components/CommentForm";
import DisplayComments from "@/components/DisplayComments";

export default async function UserPostsPage({ params }) {
  const myParams = await params;
  const postId = myParams.id;

  const post = await db.query(`SELECT * FROM posts WHERE id=${postId};`);
  const data = post.rows[0];
  // console.log(data);
  // ==============================
  // get clerk id and then name of post creator. I know there is an easier way of doing this but i wanted to try this way
  const clerkId = await db.query(
    `SELECT clerk_id FROM posts WHERE id=${postId};`
  );
  const clerkId2 = clerkId.rows[0].clerk_id;
  console.log(clerkId2);

  const myName = await db.query(
    `SELECT username FROM users WHERE clerk_id = '${clerkId2}' ;`
  );

  const myUserName = myName.rows[0].username;
  console.log(myUserName);

  // ===========================

  return (
    <>
      <h1>welcome</h1>
      <div className="my-4 mx-2">
        <Link
          className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg my-10"
          href={`/community/${clerkId2}`}
        >
          go back ...
        </Link>
      </div>

      <section className="flex flex-col items-center">
        <h1 className="font-bold">
          Date of post&#58; {dateConverter(data.posted_at)}
        </h1>
        <h1 className="font-bold">post author&#58; {myUserName}</h1>
        <h2 className="font-bold">Title&#58; {data.title}</h2>
        <div className="flex flex-col items-center gap-4 p-6 w-[70vw] min-w-[350px]">
          <Image
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
