// src/app/layout.tsx

import { Inter } from "next/font/google";

import { PropsWithChildren } from "react";

import "./globals.css";
import type { Metadata, NextPage, Viewport } from "next";

import { FocusableInitialization } from "@fastack/react-spatial";

import WelcomeLayout from "@/react/components/WelcomeLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fastack",
  description: "Fastack Frontend",
};

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
  // colorScheme: "dark" // on supprime pour passer en mode clair
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screen max-w-screen text-sky-900 bg-sky-50`}
      >
        <WelcomeLayout>
          <FocusableInitialization config={{}}>
            {children}
          </FocusableInitialization>
        </WelcomeLayout>
      </body>
    </html>
  );
};

export default Layout;
