import CodingMatching from "@/components/CodingMatching";
export default function CodePage() {
  return (
    <>
      <h1>code</h1>
      <div
        className="flex min-h-screen bg-gray-100 flex-col 
      items-center justify-between p-24"
      >
        <CodingMatching />
      </div>
    </>
  );
}
