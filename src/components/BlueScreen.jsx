"use client";
import { useState, useEffect } from "react";
import Animation from "./Animation";

export default function BlueScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show the blue screen
    setShow(true);

    // Hide the blue screen after 5 seconds
    const timer = setTimeout(() => {
      setShow(false);
    }, 8000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <>
      <div
        // style={{
        //   position: "fixed",

        //   top: 0,
        //   left: 0,
        //   width: "100%",
        //   height: "100%",
        //   backgroundColor: "blue",
        //   zIndex: 9999,
        // }}
        className="flex flex-col items-center justify-center fixed top-0 left-0 w-screen h-screen bg-red-300 z-50 bg-gradient-to-r from-blue-200 via-blue-400 to-green-400
          animate-gradient-x  transition transform duration-300 "
      >
        <div>
          <Animation />
          <div className="flex flex-row items-center justify-center">
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-md"></span>
          </div>
        </div>
      </div>
    </>
  );
}
