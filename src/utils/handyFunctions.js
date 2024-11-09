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
