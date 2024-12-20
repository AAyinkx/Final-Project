import Link from "next/link";

export const metadata = {
  title: "Mind Match - Choose a game",
  description: "choose a matching game to play",
};

export default function MatchingChallengesPage() {
  return (
    <>
      <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-6 py-5">
        Matching Activities
      </h1>
      <div className="flex flex-row gap-4 m-4 flex-wrap justify-center ">
        <div className="max-w-xs w-full text-center bg-sky-500 hover:bg-sky-600 bg-opacity-60 p-6 rounded-lg shadow-lg border-2 transform transition-transform hover:scale-105 hover:shadow-xl">
          <Link
            className="block text-2xl font-bold text-blue-800 transition duration-300 "
            href="/code/cities"
          >
            Cities
          </Link>
        </div>
        <div className="max-w-xs w-full text-center bg-sky-500 hover:bg-sky-600 bg-opacity-60 p-6 rounded-lg shadow-lg border-2 transform transition-transform hover:scale-105 hover:shadow-xl">
          <Link
            className="block text-2xl font-bold text-blue-800 transition duration-300 "
            href="code/coding-challenge"
          >
            Coding Challenge
          </Link>
        </div>
      </div>
    </>
  );
}
