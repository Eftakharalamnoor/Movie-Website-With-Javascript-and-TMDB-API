//Const Var
const apiKey = "5b8920e3ae95a1086e84a88df141baff";
const endPoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";
const apiPaths = {
    fetchAllCategories : `${endPoint}/genre/movie/list?api_key=${apiKey}`,
    fetchMoviesList : (id) => `${endPoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
    fetchTrending:`${endPoint}/trending/all/week?api_key=${apiKey}&language=en-US`,
}


// Boot Up
function init(){
    heroSlider();
    fetchAndBuildAllSections();
}


// Top Hero Slider

    function heroSlider(){
        fetchAndBuildSection(apiPaths.fetchTrending, 'Trending now')
        .then(list => {
            const randomTrending = parseInt(Math.random() * list.length)
            heroBannerSection(list[randomTrending])
        })
        .catch(err => {
            console.log(err);
        });
    }

    function heroBannerSection(trendingMovieList){
        const bannerSection = document.querySelector('#banner-section');
        bannerSection.style.backgroundImage = `url('${imgPath}${trendingMovieList.backdrop_path}')`;
        const div = document.createElement('div')
        div.innerHTML = `
        <h2 class="banner__title">${trendingMovieList.title}</h2>
            <p class="banner__info">Trending in movies | Released - ${trendingMovieList.release_date} </p>
            <p class="banner__overview">${trendingMovieList.overview && trendingMovieList.overview.length > 200 ? trendingMovieList.overview.slice(0,200).trim()+ '...':trendingMovieList.overview}</p>
            <div class="action-buttons-cont">
                <button class="action-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg> &nbsp;&nbsp; Play</button>
                <button class="action-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg> &nbsp;&nbsp; More Info</button>
            </div>
        `
        div.className = 'banner-content container';
        bannerSection.append(div);
    }

        function fetchAndBuildAllSections(){
        fetch(apiPaths.fetchAllCategories)
       .then(response => response.json())
       .then(response => {
        const categories = response.genres;
        if(Array.isArray(categories) && categories.length > 0){
                categories.forEach(categori =>{
                    fetchAndBuildSection(apiPaths.fetchMoviesList(categori.id),categori.name);
                })
        }
        // console.table(categories);
       })
       .catch(error => console.log(error));
        }

     function fetchAndBuildSection(fetchUrl, categorieName){
            // console.log(fetchUrl, categorie);
            return fetch(fetchUrl)
            .then(response => response.json())
            .then(response => {
                // console.table(response.results);
                const movies = response.results;
                if(Array.isArray(movies) && movies.length > 0){
                    buildMovieSection(movies, categorieName)
                }
                return movies;
            })
            .catch(error => console.log(error));
            

        }

       function buildMovieSection (list, categorieName){
            // console.log(list, categorieName);
            const movieContainer = document.querySelector("#movies-cont");
            const moviesListHtml = list.map(item => {
                return `
                <img class="movie-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}">
                `
            }).join("");

            const moviesSectionHtml = `
            <h2 class="movie-section-heading">${categorieName} <span class="explore-nudge">Explore All</span></span></h2>
        <div class="movies-row">
            ${moviesListHtml}
        </div>
            `
                // console.log(moviesSectionHtml);
                const div = document.createElement("div");
                div.className = "movies-section";
                div.innerHTML = moviesSectionHtml;
                movieContainer.append(div);
                
        }

window.addEventListener("load", function(){
    init();
});