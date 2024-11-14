const paginationHelper = (currentPage, range) => {
  let paginationList;

  if (currentPage <= 5) {
    paginationList = range.slice(0, 10);
  } else if (currentPage >= 6 && currentPage <= range.length - 6) {
    paginationList = range.slice(currentPage - 5, currentPage + 5);
  } else {
    paginationList = range.slice(-10);
  }
  return paginationList;
};

export default paginationHelper;
