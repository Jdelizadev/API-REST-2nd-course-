const URLtrendingMovies = 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY;
const URlimages = (i) => `https://image.tmdb.org/t/p/w300/${i}`
const URLcategories = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
const URLtrendingSeries = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`


async function getTrendingMovies() {
    try {
       const res = await fetch(URLtrendingMovies);
       
       const data = await res.json()
       trendingMoviesPreviewList.innerHTML = ''

       data.results.forEach(movie => {
            const movieContainer = document.createElement('div')
            movieContainer.classList.add('movie-container')
            const movieImg = document.createElement('img')
            movieImg.classList.add('movie-img')
            movieImg.setAttribute('alt', movie.title)
            movieImg.setAttribute('src', URlimages(movie.poster_path))
            movieContainer.appendChild(movieImg)
            trendingMoviesPreviewList.appendChild(movieContainer)
        });

    } catch (error) {
        console.log(error)
    }

}

async function getCategories() {
    try {
        const res = await fetch(URLcategories)
        const data = await res.json()
        categoriesPreviewList.innerHTML = ''

        data.genres.forEach(genre => {

            const genreContainer = document.createElement('div')
            genreContainer.classList.add('category-container')

            const h3 = document.createElement('h3')
            h3.classList.add('category-title')
            h3.setAttribute('id', `id${genre.id}`)
            h3.innerHTML = genre.name

            genreContainer.appendChild(h3)
            categoriesPreviewList.appendChild(genreContainer)
        });

    } catch (error) {
        
    }
}

async function getTrendingSeries() {
    try {
       const res = await fetch(URLtrendingSeries);
       
       const data = await res.json()
       seriesPreviewList.innerHTML = ''

       data.results.forEach(movie => {
            const movieContainer = document.createElement('div')
            movieContainer.classList.add('movie-container')
            const movieImg = document.createElement('img')
            movieImg.classList.add('movie-img')
            movieImg.setAttribute('alt', movie.title)
            movieImg.setAttribute('src', URlimages(movie.poster_path))
            movieContainer.appendChild(movieImg)
            seriesPreviewList.appendChild(movieContainer)
        });

    } catch (error) {
        console.log(error)
    }

}



