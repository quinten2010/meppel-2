import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meppel Timeline | Historical Journey",
  description: "An immersive WebGL journey through Meppel's history from 1141 to 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}