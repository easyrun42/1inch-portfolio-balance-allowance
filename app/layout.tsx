import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "1inch aggregator portfolio",
  description: "Check your ERC20 balances and 1inch aggregator allowance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>
          {/* Required since browsers will override to default styles for elements */}
          {`
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
          `}
        </style>
      </head>
      <body className="bg-primary">
        <main className={clsx("min-h-screen flex flex-col", roboto.className)}>
          {children}
        </main>
      </body>
    </html>
  );
}
