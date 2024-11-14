"use client";

import React from "react";

export default function DeleteButton({ handleDelete, id }) {
  return (
    <>
      <form
        action={() => {
          handleDelete(id);
        }}
      >
        <button
          className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold btn btn-outline btn-error border-2
            rounded-lg "
        >
          Delete <i className="fa-solid fa-trash"></i>
        </button>
      </form>
    </>
  );
}
