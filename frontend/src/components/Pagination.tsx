// src/components/Pagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

function range(start: number, end: number): number[] {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}

export default function Pagination({
  count,
  currentPage,
  pageSize,
  searchParams,
}: {
  count: number;
  currentPage: number;
  pageSize: number;
  searchParams: SearchParams;
}) {
  const router = useRouter();
  const params = useSearchParams();

  if (count <= pageSize) return null;

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(params.toString());
    if (page <= 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", String(page));
    }
    router.push(`/?${newParams.toString()}`);
  };

  const pagesToShow = range(
    Math.max(1, currentPage - 2),
    Math.min(totalPages, currentPage + 2)
  );

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-3 text-xs text-slate-600"
    >
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-full border border-slate-200 bg-white px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <div className="flex items-center gap-1">
        {pagesToShow[0] > 1 && (
          <>
            <PageButton
              page={1}
              currentPage={currentPage}
              onClick={goToPage}
            />
            {pagesToShow[0] > 2 && (
              <span className="px-1 text-slate-400">…</span>
            )}
          </>
        )}

        {pagesToShow.map((page) => (
          <PageButton
            key={page}
            page={page}
            currentPage={currentPage}
            onClick={goToPage}
          />
        ))}

        {pagesToShow[pagesToShow.length - 1] < totalPages && (
          <>
            {pagesToShow[pagesToShow.length - 1] < totalPages - 1 && (
              <span className="px-1 text-slate-400">…</span>
            )}
            <PageButton
              page={totalPages}
              currentPage={currentPage}
              onClick={goToPage}
            />
          </>
        )}
      </div>

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-full border border-slate-200 bg-white px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}

function PageButton({
  page,
  currentPage,
  onClick,
}: {
  page: number;
  currentPage: number;
  onClick: (page: number) => void;
}) {
  const isActive = page === currentPage;
  return (
    <button
      type="button"
      onClick={() => onClick(page)}
      className={`h-7 w-7 rounded-full text-xs ${
        isActive
          ? "bg-sky-600 font-semibold text-white"
          : "bg-white text-slate-600 hover:bg-slate-100"
      }`}
    >
      {page}
    </button>
  );
}
