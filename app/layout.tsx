import type { Metadata } from "next";
import { Homemade_Apple, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";

import { JsonLd } from "@/components/site/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { personJsonLd } from "@/lib/structured-data";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const script = Homemade_Apple({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-script",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-code",
});

const DEFAULT_TITLE = "Richard Nyande — Product Designer & Creative Technologist"
const DEFAULT_DESCRIPTION =
  "Product designer and creative technologist. I design and build digital products, combining design and engineering from an early idea through to production."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — Richard Nyande",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    // TODO: add a dedicated 1200×630 OG image in /public, then set openGraph.images
  },
  twitter: {
    card: "summary",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${script.variable} ${mono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JsonLd data={personJsonLd()} />
        {children}
      </body>
    </html>
  );
}
