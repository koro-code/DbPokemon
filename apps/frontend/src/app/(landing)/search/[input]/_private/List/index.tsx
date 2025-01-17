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
}> = (props) => {
  return (
    <div className="grid gap-4 max-w-3xl">
      {props.list.map((item) => (
        <Row key={item.id} {...item} />
      ))}
    </div>
  );
};

export default List;
