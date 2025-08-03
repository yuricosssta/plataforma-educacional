import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import { cn } from "../lib/utils";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { AuthInitializer } from "@/lib/redux/AuthInitializer";
import { Footer } from "@/components/Footer";

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
        // fontSans.variable
      )}>
        <Providers>
          <ReduxProvider>
            <AuthInitializer />
            <Navbar />
            {children}
            <Footer />
          </ReduxProvider>
        </Providers>
      </body>

    </html>
  );
}