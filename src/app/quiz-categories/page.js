import quizCategories from "@/lib/quizCategoriesAll.json";
import Link from "next/link";
export default function QuizCategoriesPage() {
  return (
    <div className="flex flex-col items-center  min-h-screen p-4">
      <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-6 py-5">
        Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {quizCategories.categories.map((category) => (
          <div
            className="place-content-center text-center bg-sky-500 hover:bg-sky-600 rounded-md p-4 font-bold"
            key={category.id}
          >
            <Link href={`/quiz-categories/${category.id}`}>
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
