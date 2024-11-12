export async function GET(req) {
  // const numberOfQuestions = 20;
  const url = await req.nextUrl.searchParams;
  const qry = url.get("q");
  const category = url.get("c");
  // const { numberOfQuestions } = request.body;

  //The url of the api is very easy to manipulate so we can easy adjust for user customisation later
  let response = await fetch(
    `https://opentdb.com/api.php?amount=${qry}&category=${category}&type=multiple`
  );
  let data = await response.json();
  const length = data.length;
  console.log("length of response", length);
  console.log("array", JSON.stringify(data).length);
  if (data.response_code != 0) {
    response = await fetch(
      `https://opentdb.com/api.php?amount=${qry}&category=${category}&type=multiple`
    );
    data = await response.json();
  }

  return new Response(JSON.stringify(data));

  //Check if data is an empty array
  //If it is empty, do a new fetch
}
