"use server";

import { FC, PropsWithChildren } from "react";

const WelcomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default WelcomeLayout;
