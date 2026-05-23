import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Locanto Services | Next.js Classifieds",
  description:
    "A full-stack Next.js and Node.js classifieds services platform.",
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
