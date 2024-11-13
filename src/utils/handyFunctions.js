export function dateConverter(dbDate) {
  const isoDate = dbDate;
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
}

export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const decodeHtml = (html) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = html;
  return textArea.value;
};

export const formattedQuestion = (string) => decodeHtml(string);

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function dateConverter2(dbDate) {
  const isoDate = dbDate;
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${formattedDate} ${formattedTime}`;
}
