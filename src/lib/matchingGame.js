export const preMatchedData = [
  { country: "USA", capital: "Washington D.C." },
  { country: "UK", capital: "London" },
  { country: "France", capital: "Paris" },
  { country: "Germany", capital: "Berlin" },
  { country: "Japan", capital: "Tokyo" },
];

export const shuffleArray = (matchingData) => {
  return matchingData.slice().sort(() => Math.random() - 0.5);
};
