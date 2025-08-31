trendingBtn.addEventListener('click', () => location.hash = 'trends')
arrowBtn.addEventListener('click', () => {
    location.hash = 'home'
})
searchFormBtn.addEventListener('click', () => {
        location.hash = `#search=${searchFormInput.value}`
    })


window.addEventListener('DOMContentLoaded',navigator,false)
window.addEventListener('hashchange', navigator, false)

function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(smoothscroll);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};

function navigator () {

    location.hash.startsWith('#category=') ?
        categoriesPage() :
    location.hash.startsWith('#trends') ?
        trendsPage() :
    location.hash.startsWith('#search=') ?
        searchPage() :
    location.hash.startsWith('#movie=') ?
        MovieDetailsPage() :
        homePage()
    
};

function homePage () {
    console.log('home')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')


    trendingPreviewSection.classList.remove('inactive')
    seriesPreviewSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')

        getTrendingSeries()
        getTrendingMovies()
        getCategories()

     searchFormInput.value = ''   
};

function categoriesPage () {
    console.log('category')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')


    trendingPreviewSection.classList.add('inactive')
    seriesPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    
   // console.log(location.hash) #category=10751-Family
    const [_, urlData] = location.hash.split('=')
   // console.log(urlData) 10751-Family
   const [urlID, urlName] = urlData.split('-')

    headerCategoryTitle.innerHTML = decodeURIComponent(urlName)
    searchByCategory(urlID)
     window.scrollTo(0, 0);
};

function MovieDetailsPage () {
    console.log('movie')

    headerSection.classList.add('header-container--long')
   // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')


    trendingPreviewSection.classList.add('inactive')
    seriesPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    const [_, details] = location.hash.split('=')
    const [movieID, movieName] = details.split('-')
    movieDetails(movieID)
};

function trendsPage () {
    console.log('trends')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')
    headerCategoryTitle.innerHTML = 'More trending'


    trendingPreviewSection.classList.add('inactive')
    seriesPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    moreTrending()
};

function searchPage () {
    console.log('search')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    seriesPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, urlData] = location.hash.split('=')
    searchGeneral(urlData)
}


