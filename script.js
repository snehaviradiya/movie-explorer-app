const API_KEY = "181711a1";

let allMovies = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// fetch movies
async function fetchMovies(query) {
  const container = document.getElementById("movies");
  container.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json();

    if (data.Search) {
      allMovies = data.Search;
      displayMovies(allMovies);
    } else {
      container.innerHTML = "<p>No results found</p>";
    }

  } catch (error) {
    container.innerHTML = "<p>Error fetching data</p>";
  }
}

//display mocies
function displayMovies(movies) {
  const container = document.getElementById("movies");
  container.innerHTML = "";

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${movie.Title}</h3>
      <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" />
      <p>Year: ${movie.Year}</p>
      <button onclick="addToFavorites('${movie.imdbID}')">❤️ Favorite</button>
    `;

    container.appendChild(div);
  });
}

//search
document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value;

  if (query.length > 2) {
    fetchMovies(query);
  }
});

//sort
document.getElementById("sort").addEventListener("change", (e) => {
  let sorted = [...allMovies];

  if (e.target.value === "az") {
    sorted.sort((a, b) => a.Title.localeCompare(b.Title));
  } 
  else if (e.target.value === "za") {
    sorted.sort((a, b) => b.Title.localeCompare(a.Title));
  }

  displayMovies(sorted);
});

//filter
document.getElementById("filterYear").addEventListener("change", (e) => {
  let filtered = allMovies;

  if (e.target.value === "old") {
    filtered = allMovies.filter(movie => parseInt(movie.Year) < 2015);
  } 
  else if (e.target.value === "new") {
    filtered = allMovies.filter(movie => parseInt(movie.Year) >= 2015);
  }

  displayMovies(filtered);
});

//favourites
function addToFavorites(id) {
  const movie = allMovies.find(m => m.imdbID === id);

  const exists = favorites.some(f => f.imdbID === id);

  if (!exists) {
    favorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Added to favorites");
  } else {
    alert("Already in favorites");
  }
}

//show fav
function showFavorites() {
  if (favorites.length === 0) {
    document.getElementById("movies").innerHTML = "<p>No favorites yet</p>";
  } else {
    displayMovies(favorites);
  }
}

//dark mode
function toggleTheme() {
  document.body.classList.toggle("dark");
}