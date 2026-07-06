import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ander507.dev",
  description: "Full-stack developer, HTX student, and creator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
