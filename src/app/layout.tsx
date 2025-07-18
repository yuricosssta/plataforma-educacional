import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Escola Desafio",
  description: "Portal Didático para a Escola Desafio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">

      <body className={cn(
        "min-h-screen bg-background font-sans antialiased max-w-6xl m-auto",
        fontSans.variable
      )}>
        <Providers>
          <ReduxProvider>{children}</ReduxProvider>
        </Providers>
      </body>

    </html>
  );
}