// src/react/components/WelcomeLayout.tsx
"use server";

import { FC, PropsWithChildren } from "react";

const WelcomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-zinc-800 text-white">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-black">
          NextJS <span className="text-green-400">starter</span> pack
        </h1>
        <p className="text-base text-gray-300">
          Une base pour démarrer avec Next.js
        </p>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 w-full max-w-2xl">{children}</main>

      {/* Footer */}
      <footer className="mt-8 text-sm text-gray-400">
        © {new Date().getFullYear()} Fastack
      </footer>
    </div>
  );
};

export default WelcomeLayout;
