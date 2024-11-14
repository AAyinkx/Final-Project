"use client";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Animation2 from "@/components/Animation2";

export default function GlobalError({ error, reset }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Animation2 />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-2 py-5">
          Oh no! Something went wrong on that page&#33;
        </h2>
        <p className="text-2xl">{error.message}</p>
      </div>

      <Link
        className="transition-transform duration-300 transform hover:scale-105 text-white font-semibold bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3 m-2 rounded-full shadow-lg place-content-center"
        href="/"
        onClick={() => {
          revalidatePath("/");
          //   redirect("/");
          reset();
        }}
      >
        Back to Home Page <i className="fa-solid fa-house-chimney"></i>
      </Link>
    </div>
  );
}
