import { useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import PaginationPageLink from "./PaginationPageLink";
import paginateSearchParams from "../../../utils/paginateSearchParams";
import Select from "../Select";

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onLimitChange: (perPage: number) => void;
};

const FIRST_PAGES_LIMIT = 7;

const Pagination = ({ currentPage, total, perPage, onLimitChange }: Props) => {
  const location = useLocation();
  const getUpdatedSearchParams = (pageNumber: number) =>
    paginateSearchParams(location.search, pageNumber);

  const totalPages = useMemo(
    () => Math.ceil(total / perPage),
    [perPage, total]
  );

  const PageEllipsis = () => (
    <span   className="pagination-step text-sm text-gray-700">
      ...
    </span>
  );

  const renderPages = useCallback(() => {
    const paginationLinks = [];

    const createPageLink = (pageNumber: number) => (
      <PaginationPageLink
        active={currentPage === pageNumber}
        key={pageNumber}
        pageNumber={pageNumber}
      />
    );

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        paginationLinks.push(createPageLink(i));
      }
    } else {
      // First pages
      for (let i = 1; i <= FIRST_PAGES_LIMIT; i++) {
        paginationLinks.push(createPageLink(i));
      }

      if (currentPage > FIRST_PAGES_LIMIT && currentPage <= totalPages - 1) {
        if (FIRST_PAGES_LIMIT + 1 < currentPage) {
          paginationLinks.push(<PageEllipsis key="ellipsis1" />);
        }
        paginationLinks.push(createPageLink(currentPage));
        if (currentPage < totalPages - 1) {
          paginationLinks.push(<PageEllipsis key="ellipsis2" />);
        }
      } else {
        paginationLinks.push(<PageEllipsis key="ellipsis" />);
      }

      // Last page
      paginationLinks.push(createPageLink(totalPages));
    }

    return paginationLinks;
  }, [totalPages, currentPage]);

  const handleOnLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(e.target.value));
  };

  return (
    <div className="flex mt-auto items-center justify-between border-t border-gray-200 bg-white sm:px-4 py-3 md:px-6">
      <div className="flex flex-wrap gap-y-2 sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <div className="text-sm flex gap-1 items-center text-gray-700">
            Showing{" "}
            <Select
              value={perPage.toString()}
              onChange={handleOnLimitChange}
              options={["1", "5", "10", "25"]}
            />
            to <span className="font-medium">{total}</span> results
          </div>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            <Link
              to={`${location.pathname}?${getUpdatedSearchParams(
                currentPage - 1
              )}`}
              className={`pagination-step rounded-l-md ${
                currentPage > 1
                  || "--disabled"
              }`}
            >
              <span>Previous</span>
            </Link>

            {renderPages()}

            <Link
              to={`${location.pathname}?${getUpdatedSearchParams(
                currentPage + 1
              )}`}
              className={`pagination-step rounded-r-md ${
                currentPage < totalPages
                  || '--disabled'
              }`}
            >
              <span>Next</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
