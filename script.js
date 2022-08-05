const api_key = 'api_key=8eae384dba33ed6324a4721fd9112cf2';
const img_path = 'https://image.tmdb.org/t/p/w500';
const base_url = 'https://api.themoviedb.org/3/';

const trending_content = document.querySelector('.trending-content');
const trending_series_content = document.querySelector('.trending-series-content');
const categories_content = document.querySelector('.categories-content');
const popular_people_content = document.querySelector('.popular-people-content');

const scroll_to_top = document.querySelector('.scroll-top-btn');

scroll_to_top.addEventListener('click', function(){
    console.log('scroll to top');
    window.scroll(0, 0);
});


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

function getCategory(){
    fetch(`${base_url}/genre/movie/list?${api_key}&language=en-US`)
    .then(res => res.json())
    .then(data => {
        showCategoriesCard(data.genres);
    })
}

function getPopularPeople(){
    fetch(`${base_url}person/popular?${api_key}&language=en-US&page=1`)
    .then(res => res.json())
    .then(data => showPeople(data.results));
}

getPopularMovies();
getPopularSeries();
getCategory();
getPopularPeople();

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
                <div class="card-title">
                    <p id="title">${result.title}</p>
                </div>
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
                <div class="card-title">
                    <p id="title">${result.name}</p>
                    
                </div>
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

function showCategoriesCard(genres) {
    for(let genre of genres) {
        let div = document.createElement('div');
        div.classList.add('category-item');
        div.innerHTML = `
        <div class="card">
            <p>${genre.name}</p>
        </div>
        `;
        categories_content.appendChild(div);
    }
}

function showPeople(results) {
    for(let result of results) {
        let div = document.createElement('div');
        div.classList.add('people-card');
        div.innerHTML = `
        <div class="people-card-content">
        <div class="people-card-image">
            <img src="https://image.tmdb.org/t/p/w500${result.profile_path}" alt="Picture of ${result.name}">
        </div>
        <div class="people-card-name">
            <p>${result.name}</p>
        </div>
        </div>
        `;
        popular_people_content.appendChild(div);
    }
}