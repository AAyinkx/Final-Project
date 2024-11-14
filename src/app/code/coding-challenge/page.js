import CodingMatching from "@/components/CodingMatching";

export const metadata = {
  title: "Mind Match - Code Matching",
  description: "How good is your coding knowledge?",
};

export default function CodePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-300 to-green-800 ">
        <h1 className="mb-6 text-5xl font-extrabold text-white text-transparent bg-clip-text drop-shadow-lg">
          Coding Challenge
        </h1>
        <CodingMatching />
      </div>
    </>
  );
}
