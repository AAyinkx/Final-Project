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
            className="text-center place-content-center bg-sky-500 hover:bg-sky-600 bg-opacity-60 p-4 rounded-lg shadow-lg border-2 transform transition-transform hover:scale-105 hover:shadow-xl"
            key={category.id}
          >
            <Link
              className="block  font-bold text-blue-800 transition duration-300 "
              href={`/quiz-categories/${category.id}`}
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
