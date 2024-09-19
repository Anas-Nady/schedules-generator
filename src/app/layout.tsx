import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HTI Schedule Generator",
  description: "Generate all possible schedules for your subjects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className="antialiased bg-gray-800 min-h-screen" dir="rtl">
        {children}
      </body>
    </html>
  );
}
