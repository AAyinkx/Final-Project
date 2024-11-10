export function dateISOtoLocal(date) {
  let newDate = "";
  newDate = `${date.slice(9, 11)}/${date.slice(6, 8)}/${date.substring(1, 5)}`;

  return newDate;
}
export function timeISOLocal(date) {
  let time = "";
  time = `${date.slice(12, 17)}`;
  return time;
}
