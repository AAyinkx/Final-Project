import QuizApi5Hanifah from "@/components/QuizApi5Hanifah";
import quizOptions from "@/lib/quizCategoriesAll.json";
export default async function Quiz2({ params }) {
  const quizParam = await params;
  const wrangledCategory = quizOptions.categories;
  let categoryName;
  for (const c of wrangledCategory) {
    if (c.id == quizParam.category) {
      categoryName = c.name;
      // Exit the loop once the match is found
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-300 to-green-800 ">
        <h1 className="mb-6 text-5xl font-extrabold text-white text-transparent bg-clip-text drop-shadow-lg">
          {categoryName}
        </h1>
        <QuizApi5Hanifah category={quizParam.category} />
      </div>
    </>
  );
}
