import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
// import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import SmoothScroll from "@/components/SmoothScroll";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable", // Must be "variable" when 'axes' is present
  style: ["normal", "italic"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

// Modern UI Sans
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Monospace
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport = {
  themeColor: "#0d0e12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://vedamhomes.com"),
  title: {
    default: "Vedam Homes — Spaces Designed for Exceptional Living",
    template: "%s | Vedam Homes",
  },
  description:
    "Vedam Homes is an architect-led development studio crafting bespoke luxury residences across Visakhapatnam's most considered addresses.",
  keywords: [
    "Vedam Homes",
    "Luxury real estate Visakhapatnam",
    "Architectural residences Vizag",
    "Bespoke residential studio",
    "Modern luxury homes India",
  ],
  authors: [{ name: "Vedam Homes Studio" }],
  creator: "Vedam Homes",
  openGraph: {
    title: "Vedam Homes — Spaces Designed for Exceptional Living",
    description:
      "Every residence begins with a study of light, air, and honest materials. Explore our portfolio of curated architectural homes in Visakhapatnam.",
    url: "https://vedamhomes.com",
    siteName: "Vedam Homes",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vedam Homes Architectural Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedam Homes — Spaces Designed for Exceptional Living",
    description:
      "Curated living spaces. Uncompromised vision across Visakhapatnam's premier addresses.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#f5f1e8] text-[#15140f] selection:bg-[#15140f] selection:text-[#f5f1e8]">
        <SmoothScroll>
          <PageLoader />
          {/* <CustomCursor /> */}
          <main className="flex-1">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}