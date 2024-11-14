import Animation2 from "@/components/Animation2";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className=" flex flex-col justify-center text-center mt-10 items-center text-2xl ">
      <Animation2 />
      <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-2 py-5">
        This page does not exist
      </h1>

      <h1 className="mb-8">
        Think carefully about where you would like to go please
      </h1>

      <Link
        className="transition-transform duration-300 transform hover:scale-110 text-white font-semibold bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3 rounded-full shadow-lg"
        href="/"
      >
        Back to Homepage <i className="fa-solid fa-house-chimney"></i>
      </Link>
    </div>
  );
}
