export function randomShuffle(array) {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray;
}
// console.log(randomShuffle());
