const TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day';
const { paginationContainer } = getRefs();


export async function fetchTrendMovies(page) {
    try {
      const { data } = await axios.get(
        `${TRENDING_URL_URL}?api_key=${API_KEY}&page=${page}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

export const paginationSettings = {
    startPage: 1,
    searchType: null,
    pagination: null,
    totalItemsHome: null,
}
export const initPagination = ({ page, itemsPerPage, totalItems }) => {
    const options = {
        totalItems,
        itemsPerPage,
        page,
        visiblePages: 5,
        centerAlign: true,
        template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
            moveButton:
                '<a href="#" class="tui-page-btn tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</a>',
            disabledMoveButton:
                '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</span>',
            moreButton:
                '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                '<span class="tui-ico-ellip">...</span>' +
                '</a>'
        }
    }

    
const pagination = new Pagination('pagination', options);
pagination.on('afterMove', async ({ page }) => {
    if (paginationSettings.searchType === 'main') {
        try {
            const { results } = await fetchTrendMovies(page);
            //in this place function about render gallery//
            window.scrollTo(pageYOffset,0);
        } catch (error) {
            console.log(error);
        }
        else if { paginationSettings.searchType === 'search') {
            try {

        }