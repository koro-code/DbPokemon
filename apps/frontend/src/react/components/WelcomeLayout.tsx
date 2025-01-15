"use server";

import { FC, PropsWithChildren } from "react";

const WelcomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="m-auto md:ml-48">
      <h1 className="mb-12 text-3xl font-black">
        NextJS <span className="text-green-400">starter</span> pack
      </h1>
      {children}
    </div>
  );
};

export default WelcomeLayout;
