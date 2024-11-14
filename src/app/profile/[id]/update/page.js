import UpdateForm from "@/components/UpdateForm";
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function UpdatePage({ params }) {
  const myParams = await params;
  const posts = await db.query(`SELECT * FROM posts WHERE id=${myParams.id};`);
  const data = posts.rows[0];
  console.log(data);

  return (
    <>
      <div className="mx-11">
        <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mt-6 mb-8">
          Update Form
        </h1>
        <Link
          className="transition-transform duration-300 transform hover:scale-105  text-white font-semibold bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3  rounded-full shadow-lg place-content-center "
          href={`/profile/${myParams.id}`}
        >
          Go back
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center">
        <UpdateForm
          id={myParams.id}
          clerk_id={data.clerk_id}
          title={data.title}
          content={data.content}
          date={data.posted_at}
          image_src={data.image_src}
        />
      </div>
    </>
  );
}
