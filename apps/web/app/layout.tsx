import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SalesOS Ultimate",
  description: "The world's best SaaS for sales acceleration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
