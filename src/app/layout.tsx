import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "장지현 포트폴리오",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gradient-to-br from-[#181a20] to-[#23272f] text-[#f4f4f4] font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
