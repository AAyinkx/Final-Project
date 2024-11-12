export const preMatchedData = [
  { country: "USA", capital: "Washington D.C." },
  { country: "UK", capital: "London" },
  { country: "France", capital: "Paris" },
  { country: "Germany", capital: "Berlin" },
  { country: "Japan", capital: "Tokyo" },
];

export const preMatchedCodeData = [
  {
    question: "How do you create a responsive layout in CSS?",
    answer: "Media Queries",
  },
  {
    question: "What is the purpose of the useEffect hook in React?",
    answer: "Allows you to run code when components mount, update, or unmount",
  },
  {
    question: "How do you make an API call in JavaScript using Fetch?",
    answer: "Using the Fetch API",
  },
  {
    question: "What is the purpose of the super keyword in JavaScript classes",
    answer:
      "It is required when you want to extend a class and use the parent's constructor or methods",
  },
  {
    question:
      "What is the purpose of the async and await keywords in JavaScript?",
    answer: "To work with asynchronous code",
  },
];

export const shuffleArray = (matchingData) => {
  return matchingData.slice().sort(() => Math.random() - 0.5);
};
