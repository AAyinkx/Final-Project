"use client";

import { preMatchedCodeData, shuffleArray } from "@/lib/matchingGame";
import { useEffect, useState } from "react";

export default function CodingMatching() {
  const [shuffledMatchData, setShuffledMatchData] =
    useState(preMatchedCodeData);
  const [pairedData, setPairedData] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    setShuffledMatchData(shuffleArray(shuffleArray(preMatchedCodeData)));
  }, []);

  function handleCodeClick(match) {
    if (match === selectedMatch) {
      const newPairedMatch = [...pairedData, match];
      setPairedData(newPairedMatch);
    }
    setSelectedMatch(null);
  }
  const isMatched = (match) =>
    pairedData.some((pairedMatch) => pairedMatch === match);

  const win = pairedData.length === preMatchedCodeData.length;
  return (
    <>
      {win && <h2 className="relative text-xl text-black">You Win!</h2>}
      <div className="flex gap-5 mt-10">
        <div className="grid grid-cols-1 grid-rows-5 gap-2">
          {preMatchedCodeData.map((match, index) => (
            <button
              className={`flex flex-col items-center place-content-center rounded px-4 py-2 w-[35vw] text-white font-bold
            hover:bg-gray-700 hover:scale-105 transition ease-in duration-300
            ${isMatched(match) ? "bg-green-950" : "bg-gray-500"}
            ${selectedMatch === match && "bg-gray-900"}
            `}
              key={index}
              onClick={() => setSelectedMatch(match)}
            >
              {match.question}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 grid-rows-5 gap-2">
          {shuffledMatchData.map((match, index) => (
            <button
              className={`flex flex-col items-center place-content-center bg-gray-500 rounded px-4 py-2 w-[35vw]  text-white font-bold
            ${
              selectedMatch !== null
                ? "hover:bg-gray-700 hover:scale-105 transition ease-in duration-300"
                : "cursor-default"
            }
            ${isMatched(match) ? "bg-green-950" : "bg-gray-500"}
            `}
              key={index}
              disabled={selectedMatch === null}
              onClick={() => handleCodeClick(match)}
            >
              {match.answer}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
