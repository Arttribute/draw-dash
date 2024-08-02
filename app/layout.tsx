import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import MagicProvider from "@/components/providers/MagicProvider";
import MinipayProvider from "@/components/providers/MinipayProvider";

const chakra_petch = Chakra_Petch({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "DrawDash",
  description: "The AI drawing game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MagicProvider>
        <MinipayProvider>
          <body className={chakra_petch.className}> {children}</body>
        </MinipayProvider>
      </MagicProvider>
    </html>
  );
}
