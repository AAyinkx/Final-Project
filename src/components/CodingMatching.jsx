"use client";

import { preMatchedCodeData, shuffleArray } from "@/lib/matchingGame";
import { useEffect, useState } from "react";

export default function CodingMatching() {
  const [shuffledMatchData, setShuffledMatchData] =
    useState(preMatchedCodeData);
  const [pairedData, setPairedData] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    setShuffledMatchData(shuffleArray(preMatchedCodeData));
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
      {win && <h2 className="absolute text-green-500">You Win!</h2>}
      <div className="flex gap-5 mt-10">
        <div className="flex flex-col gap-2">
          {preMatchedCodeData.map((match, index) => (
            <button
              className={`
            rounded px-4 py-2 text-white font-bold
            hover:bg-gray-700 hover:scale-105 transition ease-in duration-300
            ${isMatched(match) ? "bg-green-500" : "bg-gray-500"}
            ${selectedMatch === match && "bg-gray-900"}
            `}
              key={index}
              onClick={() => setSelectedMatch(match)}
            >
              {match.question}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {shuffledMatchData.map((match, index) => (
            <button
              className={`
            bg-gray-500 rounded px-4 py-2 text-white font-bold
            ${
              selectedMatch !== null
                ? "hover:bg-gray-700 hover:scale-105 transition ease-in duration-300"
                : "cursor-not-allowed"
            }
            ${isMatched(match) ? "bg-green-500" : "bg-gray-500"}
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
