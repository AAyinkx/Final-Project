import QuizApi4Hanifah from "@/components/not-in-use/QuizApi4Hanifah";
import QuizApi5Hanifah from "@/components/QuizApi5Hanifah";
import { currentUser } from "@clerk/nextjs/server";
export default async function Quiz2({ params }) {
  const user = await currentUser();
  const quizParam = await params;
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-300 to-green-800 ">
        <h1 className="mb-6 text-5xl font-extrabold text-white text-transparent bg-clip-text drop-shadow-lg">
          Mind Match Quiz
        </h1>
        <QuizApi5Hanifah category={quizParam.category} />
      </div>
    </>
  );
}
