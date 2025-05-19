const API_KEY = '3445349c-5a9a-4a1c-a5a8-702fe5545dd6';
const API_URL_TOP_250 =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1';

getMovies(API_URL_TOP_250);

async function getMovies(url) {
  const response = await fetch(url, {
    headers: {
      //   'content-type': 'application/json',
      'X-API-KEY': API_KEY
    }
  });
  const responseData = await response.json();
  showMovies(responseData);
}

function showMovies(data) {
  const moviesElement = document.querySelector('.container__movies');

  data.items.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('container__movies__movie');
    movieElement.innerHTML = `<div class="container__movies__movie__cover-inner">
            <img
              src="${movie.posterUrlPreview}"
              alt="${movie.nameRu}"
              class="container__movies__movie__cover"
            />
            <div class="container__movies__movie__cover-darkened"></div>
          </div>
          <div class="container__movies__movie__info">
            <div class="container__movies__movie__info__title">${
              movie.nameRu
            }</div>
            <div class="container__movies__movie__info__category">
              ${movie.genres.map((genre) => ` ${genre.genre}`).join('')}
            </div>
            <div class="container__movies__movie__info__average green">${
              movie.ratingKinopoisk ? movie.ratingKinopoisk.toFixed(1) : 'Н/Д'
            }</div>
          </div>`;

    function getRatingColor(rating) {
      if (rating >= 4) return 'yellow';
      if (rating >= 7) return 'green';
      return 'red';
    }

    moviesElement.appendChild(movieElement);
  });
}
