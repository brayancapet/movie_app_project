const api_key = 'api_key=8eae384dba33ed6324a4721fd9112cf2';
const img_path = 'https://image.tmdb.org/t/p/w500';
const base_url = 'https://api.themoviedb.org/3/';

const trending_content = document.querySelector('.trending-content');
const trending_series_content = document.querySelector('.trending-series-content');

// My list of movie and series
let myLibrary = [];

// Array that will store the data i get from the api for the movies
let movieResultArray = [];
// Array that will store the data i get from the api for the series
let serieResultArray = [];

function Movie(title, poster){
    this.title = title;
    this.poster = poster;
}

function Serie(title, poster) {
    this.title = title;
    this.poster = poster;
}

function getPopularMovies() {
    fetch(`${base_url}movie/popular?${api_key}&language=en-US&page=1`)
    .then(res => res.json())
    .then(data => {
        showCard(data.results);
    });
}

function getPopularSeries(){
    fetch(`${base_url}tv/popular?${api_key}&language=en-US&page=1`)
    .then(res => res.json())
    .then(data => {
        showSeriesCard(data.results);
    })
}

getPopularMovies();
getPopularSeries();

function showCard(results){
    for(let result of results){
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" style="height: 100%; width:100%;object-fit:cover;border-radius:0.375rem;">
            </div>
            <div class="flip-card-back">
                <p id="title">${result.title}</p>
                <p id="overview">
                    ${result.overview}
                </p>
            </div>
        </div>
        </div>
        `;
        trending_content.append(div);
    }
}

function showSeriesCard(results){
    for(let result of results){
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" style="height: 100%; width:100%;object-fit:cover;border-radius:0.375rem;">
            </div>
            <div class="flip-card-back">
                <p id="title">${result.name}</p>
                <p id="overview">
                    ${result.overview}
                </p>
            </div>
        </div>
        </div>
        `;
        trending_series_content.append(div);
    }
}
