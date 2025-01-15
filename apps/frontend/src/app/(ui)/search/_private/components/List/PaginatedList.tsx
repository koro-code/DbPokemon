"use client";

import { FC, useState } from "react";

import { Disclosure, DisclosureButton } from "@headlessui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

import Row, { Pokemon } from "./Row";

const PaginatedList: FC<{
  items: Pokemon[];
  totalPages: number;
  itemsPerPage: number;
}> = ({ items, totalPages, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="space-y-4">
      {visibleItems.map((item, index) => (
        <Disclosure key={item.image.value}>
          <DisclosureButton className="w-full">
            <div
              className={`border-b ${index === visibleItems.length - 1 ? "border-b-0" : ""}`}
            >
              <Row {...item} />
            </div>
          </DisclosureButton>
        </Disclosure>
      ))}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-sky-600 hover:bg-sky-50"
            } transition-colors duration-200`}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === i + 1
                  ? "bg-sky-600 text-white"
                  : "bg-white text-sky-600 hover:bg-sky-50"
              } transition-colors duration-200`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-sky-600 hover:bg-sky-50"
            } transition-colors duration-200`}
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="text-center text-sm text-slate-500">
        Affichage de {startIndex + 1} à{" "}
        {Math.min(startIndex + itemsPerPage, items.length)} sur {items.length}{" "}
        Pokémon
      </div>
    </div>
  );
};

export default PaginatedList;
