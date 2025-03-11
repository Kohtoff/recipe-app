const paginateSearchParams = (urlParamsStr: string, pageNumber: number) => {
  const searchParams = new URLSearchParams(urlParamsStr);
  searchParams.delete("page");
  searchParams.set("page", pageNumber.toString());
  return searchParams.toString();
};

export default paginateSearchParams;
