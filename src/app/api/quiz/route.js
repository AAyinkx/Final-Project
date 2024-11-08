export async function POST(request) {
  // const numberOfQuestions = 20;
  const { numberOfQuestions } = request.body;
  const category = 21;
  const difficulty = "easy";
  //The url of the api is very easy to manipulate so we can easy adjust for user customisation later
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  const data = await response.json();
  const wrangledData = data.results;
  return new Response(JSON.stringify(wrangledData));
}
