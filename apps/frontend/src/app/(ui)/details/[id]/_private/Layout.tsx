import { FC, PropsWithChildren } from "react";

import BackButton from "./Back";

export const DetailsLayout: FC<
  PropsWithChildren<{
    title: string;
  }>
> = (props) => {
  return (
    <div className="">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 text-center sm:text-left">
          {props.title}
        </h1>
      </header>
      <div className="mb-8">
        <BackButton />
      </div>
      <div className="max-w-4xl mx-auto">{props.children}</div>
    </div>
  );
};
