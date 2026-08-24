import type { Metadata } from "next";
import { Homemade_Apple, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";

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

export const metadata: Metadata = {
  title: "Richard Nyande",
  description: "Product designer and creative technologist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${script.variable} ${mono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
