"use server";

import { FC } from "react";
import Row from "./Row";

const List: FC<{
  list: Array<{
    id: number;
    name: string;
    image: string;
    description: string;
    types: string[];
    height: number;
    weight: number;
    color: string;
    category: string;
  }>;
}> = ({ list }) => {
  if (!list || list.length === 0) {
    return <p className="text-slate-500">Aucun Pokémon trouvé.</p>;
  }

  return (
    <div className="grid gap-4 max-w-3xl">
      {list.map((item) => (
        <Row key={item.id} {...item} />
      ))}
    </div>
  );
};

export default List;
