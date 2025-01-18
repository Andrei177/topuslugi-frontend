import type { Metadata } from "next";
import { Raleway, Lato } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ['400', '500']
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Топуслуги",
  description: "Топуслуги топ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${lato.variable}`}>
        {children}
      </body>
    </html>
  );
}
