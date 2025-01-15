"use server";

import { FC, Suspense } from "react";

import Loading from "./Loading";
import PaginatedList from "./PaginatedList";
import { Pokemon } from "./Row";

const ITEMS_PER_PAGE = 10;

const List: FC<{
  list: Array<Pokemon>;
}> = ({ list }) => {
  if (list.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow">
        <p className="text-slate-500">Aucun Pokémon trouvé.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);

  return (
    <Suspense fallback={<Loading />}>
      <PaginatedList
        items={list}
        itemsPerPage={ITEMS_PER_PAGE}
        totalPages={totalPages}
      />
    </Suspense>
  );
};

export default List;
