import QuizApi4Hanifah from "@/components/QuizApi4Hanifah";
import QuizApi5Hanifah from "@/components/QuizApi5Hanifah";
import { currentUser } from "@clerk/nextjs/server";
export default async function Quiz2() {
  const user = await currentUser();
  return (
    <>
      <h1>quiz categories {user.id}</h1>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-green-300">
        <h1 className="mb-6 font-bold text-3xl">The Mind Match Quiz</h1>

        <QuizApi5Hanifah />
      </div>
    </>
  );
}
