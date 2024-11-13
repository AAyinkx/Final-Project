import BoxMatching from "@/components/BoxMatching";
export default function CodePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-300 to-green-800 ">
        <h1 className="mb-6 text-5xl font-extrabold text-white text-transparent bg-clip-text drop-shadow-lg">
          Cities
        </h1>
        <BoxMatching />
      </div>
    </>
  );
}
