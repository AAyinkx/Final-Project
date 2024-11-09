export async function GET(req) {
  // const numberOfQuestions = 20;
  const url = await req.nextUrl.searchParams;
  const qry = url.get("q");
  // const { numberOfQuestions } = request.body;
  const category = "science";
  const difficulty = "easy";
  //The url of the api is very easy to manipulate so we can easy adjust for user customisation later
  const response = await fetch(
    `https://the-trivia-api.com/v2/questions/?limit=${qry}&categories=${category}&difficulty=${difficulty}`
  );
  const data = await response.json();
  const wrangledData = data;
  const length = wrangledData.length;
  console.log("length of response", length);
  console.log("array", JSON.stringify(wrangledData).length);
  return new Response(JSON.stringify(wrangledData));
}
