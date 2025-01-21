"use server";

import { FC } from "react";

import Row, { Pokemon } from "./Row";

const List: FC<{
  list: Array<Pokemon>;
}> = ({ list }) => {
  if (list.length === 0) {
    return <p className="text-slate-500">Aucun Pokémon trouvé.</p>;
  }

  return (
    <div className="grid gap-4 max-w-3xl">
      {list.map((item) => (
        <Row key={item.image.value} {...item} />
      ))}
    </div>
  );
};

export default List;
