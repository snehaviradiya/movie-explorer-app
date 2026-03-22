const API_KEY = "181711a1";

async function fetchMovies(query) {
  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json();

    console.log(data); // for testing
  } catch (error) {
    console.log("Error:", error);
  }
}