import Leaderboard from "@/components/Leaderboard";

export default function Leaderboardpage() {
  return (
    <div className="p-4">
      <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-6 mt-8">
        Leaderboard
      </h1>
      <Leaderboard />
    </div>
  );
}
