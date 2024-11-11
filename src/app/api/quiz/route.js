export async function GET(req) {
  // const numberOfQuestions = 20;
  const url = await req.nextUrl.searchParams;
  const qry = url.get("q");
  // const { numberOfQuestions } = request.body;
  const category = 21;
  const difficulty = "easy";
  //The url of the api is very easy to manipulate so we can easy adjust for user customisation later
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${qry}&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  const data = await response.json();
  const wrangledData = data;
  const length = wrangledData.length;
  console.log("length of response", length);
  console.log("array", JSON.stringify(wrangledData).length);
  return new Response(JSON.stringify(wrangledData));
}
