import React, { useMemo } from "react";
import parseQuery from "../../lib/parseQuery";

function PageNavigation({ searchParams, setSearchParams, count, filter }) {
  const query = useMemo(() => parseQuery(searchParams), [searchParams]);

  function pages() {
    const arr = [];
    const activePage = Number(query.page) || 1;
    const pagesNb = Math.floor(count / ((Number(query.ppp) || 25) + 1)) + 1;

    // Calculate the starting and ending page numbers
    let startPage = Math.max(1, activePage - 2);
    let endPage = Math.min(pagesNb, activePage + 2);

    // Adjust the starting and ending page numbers if there are fewer than 5 pages
    if (endPage - startPage + 1 < 5) {
      if (startPage === 1) {
        endPage = Math.min(pagesNb, startPage + 4);
      } else if (endPage === pagesNb) {
        startPage = Math.max(1, endPage - 4);
      }
    }

    // Generate the page buttons
    for (let i = startPage; i <= endPage; i++) {
      arr.push(
        <button
          key={i}
          className={`flex h-9 w-9 items-center justify-center rounded-md border bg-sky-600 text-white ${
            activePage === i ? "ring-2 ring-offset-1 ring-sky-500" : ""
          } duration-300 hover:bg-sky-700`}
          onClick={() => setSearchParams((prev) => ({ ...parseQuery(prev), page: i }))}
        >
          {i}
        </button>
      );
    }

    return arr;
  }

  // function pages() {
  //   const arr = [];
  //   const pagesNb = Math.floor(count / (filter.productsPerPage + 1)) + 1;
  //   for (let i = 1; i <= pagesNb; i++) {
  //     arr.push(
  //       <button
  //         key={i}
  //         className={`flex h-9 w-9 items-center justify-center rounded-md border bg-sky-600 text-white ${
  //            ? "ring-2 ring-offset-1 ring-sky-500" : ""
  //         } duration-300 hover:bg-sky-700`}
  //         onClick={() => setSearchParams((prev) => ({ ...parseQuery(prev), page: i }))}
  //       >
  //         {i}
  //       </button>
  //     );
  //   }
  //   return arr;
  // }

  return (
    <section className="flex gap-1">
      <button
        className={`flex h-9 w-9 items-center justify-center rounded-md border bg-sky-600 text-xl font-medium text-white duration-300 ${
          (Number(query.page) || 1) <= 1 ? "cursor-not-allowed" : "hover:bg-sky-700"
        }`}
        onClick={() => {
          if ((Number(query.page) || 1) > 1) setSearchParams({ ...query, page: (Number(query.page) || 1) - 1 });
        }}
      >
        {`<`}
      </button>
      {pages()}

      <button
        className={`flex h-9 w-9 items-center justify-center rounded-md border bg-sky-600 text-xl font-medium text-white duration-300 ${
          (Number(query.page) || 1) >= Math.floor(count / (Number(searchParams.get("ppp")) || 25) + 1) ? "cursor-not-allowed" : "hover:bg-sky-700"
        }`}
        onClick={() => {
          if ((Number(query.page) || 1) < Math.floor(count / (Number(searchParams.get("ppp")) || 25) + 1))
            setSearchParams({ ...query, page: (Number(query.page) || 1) + 1 });
        }}
      >
        {`>`}
      </button>
    </section>
  );
}

export default PageNavigation;
