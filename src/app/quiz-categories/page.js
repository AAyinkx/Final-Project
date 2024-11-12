import quizCategories from "@/lib/quizCategories.json";
import Link from "next/link";
export default function QuizCategoriesPage() {
  return (
    <>
      <h1>Categories</h1>

      {quizCategories.categories.map((category) => (
        <div key={category.id}>
          <Link href={`/quiz-categories/${category.id}`}>{category.name}</Link>
        </div>
      ))}
    </>
  );
}
