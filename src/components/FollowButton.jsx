"use client";

export default function FollowButton({ handleFollow, follower, followed }) {
  return (
    <>
      <button
        onClick={() => {
          handleFollow(follower, followed);
        }}
        className="hover:scale-105 ease-in-out transition-transform duration-300 font-bold bg-blue-800 w-fit p-0.5 bg-gradient-to-r from-green-200 to-green-400 px-6 py-3 border-2
            rounded-lg "
      >
        Follow <i className="fa-solid fa-user-plus"></i>
      </button>
    </>
  );
}
