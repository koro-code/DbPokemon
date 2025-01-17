import { FC, PropsWithChildren } from "react";

export const BaseLayout: FC<
  PropsWithChildren<{
    title: string;
  }>
> = (props) => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
            {props.title}
          </h1>
        </header>
        <main className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-6">{props.children}</div>
        </main>
      </div>
    </div>
  );
};
