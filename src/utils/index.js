import { add, format, sub } from "date-fns";

export const dateParamHelper = (dateSelection) => {
  let dateParam = new Date(dateSelection.startDate).getTime();
  let dateParam2 = add(new Date(dateSelection.endDate), { days: 1 }).getTime();

  dateParam = Math.floor(dateParam / 1000);
  dateParam2 = Math.floor(dateParam2 / 1000);
  return { dateParam, dateParam2 };
};

export const paginationHelper = (currentPage, range) => {
  let paginationList;
  const paginationRange = Array.from({ length: range }, (_, i) => {
    return i + 1;
  });

  if (currentPage <= 5) {
    paginationList = paginationRange.slice(0, 10);
  } else if (currentPage >= 6 && currentPage <= paginationRange.length - 6) {
    paginationList = paginationRange.slice(currentPage - 5, currentPage + 6);
  } else {
    paginationList = paginationRange.slice(-10);
  }
  return paginationList;
};

export const dateHandler = (dateSelection) => {
  const str1 = format(dateSelection.startDate, "PP");
  const str2 = format(dateSelection.endDate, "PP");

  return `${str1} > ${str2}`;
};

export const modifyDateParam = (dateParam) => {
  if (dateParam === "last24") {
    return sub(Date.now(), {
      days: 1,
    }).getTime();
  }
  if (dateParam === "pastWeek") {
    return sub(Date.now(), {
      weeks: 1,
    }).getTime();
  }
  if (dateParam === "pastMonth") {
    return sub(Date.now(), {
      months: 1,
    }).getTime();
  }
  if (dateParam === "pastYear") {
    return sub(Date.now(), {
      years: 1,
    }).getTime();
  }
  return "";
};
