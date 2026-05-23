import type { Metadata } from "next";
import { Poppins, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clipe233 Engineers | Engineering Smart Digital Solutions",
  description:
    "Clipe233 Engineers delivers innovative software, networking, branding, and digital transformation solutions tailored for businesses and organizations in Ghana and beyond.",
  keywords: [
    "IT Company Ghana",
    "Software Development Ghana",
    "Website Design Ho Ghana",
    "Networking Engineers Ghana",
    "Graphic Design Company Ghana",
    "Digital Solutions Ghana",
    "Tech Company Volta Region",
    "IT Consultancy Ghana",
    "Clipe233 Engineers",
    "Clipetech",
  ],
  authors: [{ name: "Clipe233 Engineers" }],
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "Clipe233 Engineers | Engineering Smart Digital Solutions",
    description:
      "Innovative software, networking, branding, and digital transformation solutions for modern businesses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clipe233 Engineers | Engineering Smart Digital Solutions",
    description:
      "Innovative software, networking, branding, and digital transformation solutions for modern businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased bg-black text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
