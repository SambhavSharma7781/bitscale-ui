import type { Metadata } from "next";
import "./globals.css";
import { LayoutShell } from "./components/LayoutShell";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Bitscale Clone — Dashboard",
  description:
    "AI-powered B2B sales intelligence platform. Find companies, people, and automate your GTM workflows.",
  keywords: ["B2B", "sales intelligence", "AI", "lead generation", "GTM"],
  openGraph: {
    title: "Bitscale Clone",
    description: "AI-powered B2B sales intelligence platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <TooltipProvider delayDuration={300}>
          <LayoutShell>{children}</LayoutShell>
        </TooltipProvider>
      </body>
    </html>
  );
}
