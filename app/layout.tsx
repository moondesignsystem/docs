import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Navbar } from "@/components/navbar";
import { DM_Sans, DM_Mono } from "next/font/google";
import { FooterWrapper } from "@/components/ui/footer-wrapper";
import "@/styles/moon-core.css";
import "@/styles/core.css";
import "@/styles/globals.css";

const GTAG = "G-VQMMMH68C3";

const sansFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-regular",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const monoFont = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Moon Design System",
    template: "%s | Moon Design System",
  },
  metadataBase: new URL("https://moondesignsystem.com"),
  description:
    "Moon is a complete design system built to help product teams across the world build better digital experiences.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Moon Design System",
    description:
      "Moon is an open-source design system built for fast, scalable digital experiences.",
    url: "https://moondesignsystem.com/",
    siteName: "Moon Design System",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTAG}');
          `}
        </Script>
      </head>
      <body
        className="bg-primary text-primary font-default"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["light-theme", "dark-theme"]}
          value={{
            light: "light-theme",
            dark: "dark-theme",
            system: "system",
          }}
        >
          <Navbar />
          <main className="sm:container mx-auto w-[90vw] h-auto scroll-smooth">
            {children}
          </main>
          <FooterWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
