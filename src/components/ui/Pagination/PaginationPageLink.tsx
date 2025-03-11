import { Link, useLocation } from "react-router";
import paginateSearchParams from "../../../utils/paginateSearchParams";

type Props = {
  pageNumber: number;
  active?: boolean;
};

const PaginationPageLink = ({ pageNumber, active }: Props) => {
  const location = useLocation();
  const updatedSearchParams = paginateSearchParams(location.search, pageNumber);

  return (
    <Link
      to={`${location.pathname}?${updatedSearchParams}`}
      aria-current="page"
      className={`pagination-step ${
        active ? "text-white bg-indigo-600 focus:z-20" : "text-gray-900 hover:bg-gray-50"
      }`}
    >
      {pageNumber}
    </Link>
  );
};

export default PaginationPageLink;
