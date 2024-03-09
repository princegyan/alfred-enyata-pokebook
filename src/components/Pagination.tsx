import  { useMemo } from "react";

interface PaginationProps {
  numPages: number;
  currentPage: number;
  onChanged: (page: number) => void;
}

export function Pagination({ numPages, currentPage, onChanged }: PaginationProps) {
  const { leftPages, middlePages, rightPages } = useMemo(() => {
    const left = currentPage > 4 ? [1] : [1, 2, 3, 4];
    const middle =
      currentPage <= 4
        ? []
        : currentPage + 3 >= numPages
        ? []
        : [currentPage - 1, currentPage, currentPage + 1];
    const right =
      currentPage + 3 < numPages
        ? [numPages]
        : [numPages - 3, numPages - 2, numPages - 1, numPages];
    return { leftPages: left, middlePages: middle, rightPages: right };
  }, [numPages, currentPage]);

  return (
    <div className="flex gap-4 items-center [&>button]:min-w-7 [&>button]:h-7">
      <button
        className="rounded bg-gray-200 flex justify-center items-center active:bg-gray-300"
        onClick={() =>
          onChanged(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      >
        <span className="rotate-180">
          <PrevSVG />
        </span>
      </button>
      {leftPages.map((page) => (
        <button
          key={page}
          className={`rounded ${
            currentPage === page
              ? "bg-[var(--primary-color)] text-white "
              : "bg-gray-200 "
          }  text-sm font-medium flex justify-center items-center active:opacity-70`}
          onClick={() => onChanged(page)}
        >
          {page}
        </button>
      ))}
      {currentPage > 4 ? <span>...</span> : null}
      {middlePages.map((page) => (
        <button
          key={page}
          className={`rounded ${
            currentPage === page
              ? "bg-[var(--primary-color)] text-white "
              : "bg-gray-200 "
          }  text-sm font-medium flex justify-center items-center active:opacity-70`}
          onClick={() => onChanged(page)}
        >
          {page}
        </button>
      ))}
      {currentPage + 3 < numPages ? <span>...</span> : null}
      {rightPages.map((page) => (
        <button
          key={page}
          className={`rounded ${
            currentPage === page
              ? "bg-[var(--primary-color)] text-white "
              : "bg-gray-200 "
          }  text-sm font-medium flex justify-center items-center active:opacity-70`}
          onClick={() => onChanged(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="rounded bg-gray-200 flex justify-center items-center active:bg-gray-300"
        onClick={() =>
          onChanged(currentPage < numPages ? currentPage + 1 : currentPage)
        }
      >
        <PrevSVG />
      </button>
    </div>
  );
}

function PrevSVG() {
  return (
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      className="rotate-180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.45629 14.825L1.13754 8.52499C1.06254 8.44999 1.00929 8.36874 0.977786 8.28124C0.946286 8.19374 0.930786 8.09999 0.931286 7.99999C0.931286 7.89999 0.947036 7.80624 0.978536 7.71874C1.01004 7.63124 1.06304 7.54999 1.13754 7.47499L7.45629 1.15624C7.63129 0.981238 7.85004 0.893738 8.11254 0.893738C8.37504 0.893738 8.60004 0.987488 8.78754 1.17499C8.97504 1.36249 9.06879 1.58124 9.06879 1.83124C9.06879 2.08124 8.97504 2.29999 8.78754 2.48749L3.27504 7.99999L8.78754 13.5125C8.96254 13.6875 9.05004 13.9032 9.05004 14.1597C9.05004 14.4162 8.95629 14.638 8.76879 14.825C8.58129 15.0125 8.36254 15.1062 8.11254 15.1062C7.86254 15.1062 7.64379 15.0125 7.45629 14.825Z"
        fill="black"
      />
    </svg>
  );
}
