import React, { useMemo } from "react";
import parseQuery from "../../lib/parseQuery";

function PageNavigation({ searchParams, setSearchParams, count, filter }) {
  const query = useMemo(() => parseQuery(searchParams), [searchParams]);

  function pages() {
    const arr = [];
    const pagesNb = Math.floor(count / (filter.productsPerPage + 1)) + 1;
    for (let i = 1; i <= pagesNb; i++) {
      arr.push(
        <button
          key={i}
          className={`flex h-9 w-9 items-center justify-center rounded-md border ${
            (Number(query.page) || 1) === i ? "!bg-slate-300" : "bg-slate-100"
          } text-slate-700 duration-300 hover:bg-slate-200`}
          onClick={() => setSearchParams((prev) => ({ ...parseQuery(prev), page: i }))}
        >
          {i}
        </button>
      );
    }
    return arr;
  }

  return (
    <section className="flex gap-1">
      <button
        className={`flex h-9 w-9 items-center justify-center rounded-md border bg-slate-100 text-xl font-medium text-slate-700 duration-300 ${
          (Number(query.page) || 1) <= 1 ? "cursor-not-allowed" : "hover:bg-slate-200"
        }`}
        onClick={() => {
          if ((Number(query.page) || 1) > 1) setSearchParams({ ...query, page: (Number(query.page) || 1) - 1 });
        }}
      >
        {`<`}
      </button>
      {pages()}

      <button
        className={`flex h-9 w-9 items-center justify-center rounded-md border bg-slate-100 text-xl font-medium text-slate-700 duration-300 ${
          (Number(query.page) || 1) >= Math.floor(count / (filter.productsPerPage + 1)) + 1 ? "cursor-not-allowed" : "hover:bg-slate-200"
        }`}
        onClick={() => {
          if ((Number(query.page) || 1) < Math.floor(count / (filter.productsPerPage + 1)) + 1)
            setSearchParams({ ...query, page: (Number(query.page) || 1) + 1 });
        }}
      >
        {`>`}
      </button>
    </section>
  );
}

export default PageNavigation;
