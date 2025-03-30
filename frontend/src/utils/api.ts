import { BASE_URL } from "./constants";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error:  ${res.status}`);
  }
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// fictional watchlist until backend is built
//pretending that you're fetching to the database to get the movies saved in the watchlist
export function getSavedMovies(token) {
  return request(`${BASE_URL}/movies`, {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

// Save movie
export function saveMovie({ imdbID, title, poster, year }, token) {
  return request(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imdbID,
      title,
      poster,
      year
    }),
  });
}

// Unsave movie
export function unsaveMovie(imdbID, token) {
  return request(`${BASE_URL}/movies/${imdbID}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
