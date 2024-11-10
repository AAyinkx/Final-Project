"use client";

import "./ThumbButton.css";
import { useState } from "react";
export default function ThumbButton({ id, handleClicks, start }) {
  const [likes, setLikes] = useState(start);

  return (
    <>
      <div id="thumb-container">
        <button
          className="thumButton"
          onClick={() => {
            handleClicks(id);
            setLikes(likes + 1);
          }}
        >
          <i
            className={
              likes ? "fa-solid fa-thumbs-up green" : "fa-regular fa-thumbs-up"
            }
          ></i>
        </button>
        <div id="scale" className={`${likes ? "green" : null} ${"thumButton"}`}>
          {likes}
        </div>
      </div>
    </>
  );
}
