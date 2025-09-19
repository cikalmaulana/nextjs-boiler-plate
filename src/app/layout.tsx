import type { Metadata } from "next";
import "./globals.css";
import CE_Toast from "@/lib/ui/toast";

export const metadata: Metadata = {
  title: "NextJS Boilerplate",
  description: "A clean and scalable NextJS Boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CE_Toast name="toast" />
        {children}
      </body>
    </html>
  );
}
