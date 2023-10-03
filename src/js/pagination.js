//<--The following code has been created with TOASTUI Component/Pagination-->//

import { fetchPopular } from './';
import Pagination from 'tui-pagination';

const options = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
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
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' + '<span>⋅⋅⋅</span>' + '</a>',
  },
};

const pagination = new Pagination('pagination', options);

// EVENT "afterMove" from TOASTUI Component/Pagination API//
//<-- The function below calculates the starting and ending indices of the items to be displayed on the current page. It accepts an array of items as input and returns a new array containing the subset of items for the current page -->//

pagination.on('afterMove', function (eventData) {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const currentPage = eventData.page;
  const startIndex = (currentPage - 1) * options.itemsPerPage;
  const endIndex = startIndex + options.itemsPerPage;

  if (currentPage > 1) {
    fetchPopular(startIndex, endIndex);
  }
});

export default pagination;

// <--Code need to be add to the others functions: --> //
// FetchPopular:
// 1. import pagination from './pagination';
// 2. pagination.getCurrentPage(page);
// 3. pagination.on('afterMove', evt => {
//  fetchPopular(evt.page);
//});

// searchBy:
// 1. import pagination from './pagination';
// 2. const ex.paginationTemplate = document.querySelector('#pagination');
// pagination.reset();
// const ex.paginationTemplate.classList.add('is-hidden');
// pagination.on('afterMove', e => {
// margeData?(e.page);
// });