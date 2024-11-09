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
        <h1 className="font-bold my-7">Update Form</h1>
        <Link
          className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg "
          href={`/profile/${myParams.id}`}
        >
          go back ...
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
