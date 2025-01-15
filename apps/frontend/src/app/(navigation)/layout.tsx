import { NextPage } from "next";

import { PropsWithChildren } from "react";

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
