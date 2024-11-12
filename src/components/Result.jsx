"use client";
export default function Result({ score, totalQuestions, onRestart, userId }) {
  // async function handleDbPost(userId) {
  //   const postData = {
  //     id: userId,
  //   };
  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-green-300">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg mb-4">
          Your Score: {score} / {totalQuestions}
        </p>
        <button className="py-2 px-4btn btn btn-info" onClick={onRestart}>
          Try Again
        </button>
      </div>
    </div>
  );
}
