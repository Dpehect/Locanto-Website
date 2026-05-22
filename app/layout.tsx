import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Locanto Services Clone | Next.js Classifieds",
  description:
    "A full-stack Next.js and Node.js classifieds services page inspired by Locanto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
