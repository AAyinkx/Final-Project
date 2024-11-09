"use client";

export default function FollowButton({ handleFollow, follower, followed }) {
  return (
    <>
      <button
        onClick={() => {
          handleFollow(follower, followed);
        }}
        className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-blue-100 w-fit p-0.5 border-red-500 border-2
            rounded-lg "
      >
        Follow
      </button>
    </>
  );
}
