import QuizApi4Hanifah from "@/components/not-in-use/QuizApi4Hanifah";
import QuizApi5Hanifah from "@/components/QuizApi5Hanifah";
import { currentUser } from "@clerk/nextjs/server";
export default async function Quiz2({ params }) {
  const user = await currentUser();
  const quizParam = await params;
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-green-300">
        <h1 className="mb-6 text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-sky-400 text-transparent bg-clip-text drop-shadow-lg">
          Quiz App
        </h1>
        <QuizApi5Hanifah category={quizParam.category} />
      </div>
    </>
  );
}
