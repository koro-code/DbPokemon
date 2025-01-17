"use server";

import { FC } from "react";

import Row from "./Row";

const List: FC<{
  list: Array<{
    id: number;
    name: string;
    image: string;
  }>;
}> = (props) => {
  return (
    <div className="flex flex-col space-y-4 max-w-3xl">
      {props.list.map((item) => (
        <Row key={item.id} id={item.id} name={item.name} image={item.image} />
      ))}
    </div>
  );
};

export default List;
