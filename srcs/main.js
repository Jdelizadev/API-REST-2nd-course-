const URLtrendingMovies = 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY;
const URlimages = (i) => `https://image.tmdb.org/t/p/w300/${i}`
const URLcategories = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
const URLtrendingSeries = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
const URLrecomend = (i) => `https://api.themoviedb.org/3/movie/${i}/similar?api_key=${API_KEY}`
const URLgetByCategory = (i) => `https://api.themoviedb.org/3/discover/movie?with_genres=${i}&api_key=${API_KEY}`
const URLsearch = (i) => `https://api.themoviedb.org/3/search/movie?query=${i}&api_key=${API_KEY}`
const URLsearchById = (i) => `https://api.themoviedb.org/3/movie/${i}&api_key=${API_KEY}`
const URLimageDetails = (i) => `https://image.tmdb.org/t/p/w500/${i}`
const options = {headers: {
accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmZmZGFmNzRmZDYwYmQ0NjBmMDI5ZGQ1ZjkzNDQwOSIsIm5iZiI6MTc1NTgyMTk1OS4xMjcsInN1YiI6IjY4YTdiNzg3MzlhN2M0NzNiNDY0NjJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vwZ-SXqq7AU1t4p4kfQzmTBt7sg472NGyElf4uyDmYw'
  }} 


//Utils

 function createMovies (object,container) {
    container.innerHTML = ''

       object.results.forEach(movie => {
            const movieContainer = document.createElement('div')
            movieContainer.addEventListener('click', () => {
                location.hash = `#movie=${movie.id}-${movie.title}`})
            movieContainer.classList.add('movie-container')
            const movieImg = document.createElement('img')
            movieImg.classList.add('movie-img')
            movieImg.setAttribute('alt', movie.title)
            movieImg.setAttribute('src', URlimages(movie.poster_path))
            movieContainer.appendChild(movieImg)
            container.appendChild(movieContainer)
        });
}

function createCategories (object, container) {
    container.innerHTML = ''

        object.genres.forEach(genre => {

            const genreContainer = document.createElement('div')
            genreContainer.classList.add('category-container')

            const h3 = document.createElement('h3')
            h3.classList.add('category-title')
            h3.setAttribute('id', `id${genre.id}`)
            h3.innerHTML = genre.name
            h3.addEventListener('click', () => {
                location.hash = `#category=${genre.id}-${genre.name}`
            })

            genreContainer.appendChild(h3)
            container.appendChild(genreContainer)
        });

}

//LLamados a la API

async function getTrendingMovies() {
    try {
       const res = await fetch(URLtrendingMovies);
       const data = await res.json()
       createMovies(data,trendingMoviesPreviewList)
       
    } catch (error) {
        console.log(error)
    }

}

async function getTrendingSeries() {
    try {
       const res = await fetch(URLtrendingSeries);
       const data = await res.json()
       createMovies(data,seriesPreviewList) 

    } catch (error) {
        console.log(error)
    }

}

async function getCategories() {
    try {
        const res = await fetch(URLcategories)
        const data = await res.json()
        
        createCategories(data, categoriesPreviewList)

    } catch (error) {
        
    }
}

async function searchByCategory(id) {
    try {
       const res = await fetch(URLgetByCategory(id));
       const data = await res.json()
       createMovies(data, genericSection)

    } catch (error) {
        console.log(error)
    }

}

async function searchGeneral(string) {
    try {
        const res = await fetch(URLsearch(string))
        const data = await res.json()
        
       createMovies(data,genericSection)

    } catch (error) {
        console.log(error)
    }
}

async function moreTrending(params) {
    try {
       const res = await fetch(URLtrendingMovies);
       const data = await res.json()
        console.log('moretrends')
       createMovies(data,genericSection)
       
    } catch (error) {
        console.log(error)
    }
}

async function movieDetails(id) {

    const res = await fetch(URLsearchById(id), options)
    const data = await res.json()
    console.log('Resultado:', data)
    
    headerSection.style.backgroundImage = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url('${URLimageDetails(data.poster_path)}')`
    movieDetailTitle.innerHTML = data.title
    movieDetailScore.innerHTML = data.vote_average.toFixed(1)      
    movieDetailDescription.innerHTML = data.overview
    
    createCategories(data,movieDetailCategoriesList)
    recomendMovies(id)
    relatedMoviesContainer.scrollTo(0, 0);
    
}

async function recomendMovies(ID) {
    try {
        const res = await fetch(URLrecomend(ID))
        const data = await res.json()
        createMovies(data, relatedMoviesContainer)
        console.log('recomended movies',data)
    } catch (error) {
        
    }
}

