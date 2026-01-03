import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Samudra Art Center | Handcrafted Buddha Statues & Sculptures",
  description: "Discover exquisite handcrafted Buddha statues and custom sculptures from Samudra Art Center. Premium dolomite, fiber, and concrete creations by Sri Lankan master artisans.",
  keywords: "Buddha statues, Sri Lankan art, sculptures, dolomite Buddha, custom sculptures, temple statues, religious art, Nittambuwa",
  authors: [{ name: "Samudra Art Center" }],
  icons: {
    icon: "/assets/logo/500466709_1341615020780517_7101806636583850352_n.jpg",
    apple: "/assets/logo/500466709_1341615020780517_7101806636583850352_n.jpg",
  },
  openGraph: {
    title: "Samudra Art Center | Buddha Statues & Sculptures",
    description: "Crafting divine art with devotion & precision. Handcrafted Buddha statues and custom sculptures from Sri Lanka.",
    type: "website",
    images: ["/assets/logo/500466709_1341615020780517_7101806636583850352_n.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SamudraArt",
    images: ["/assets/logo/500466709_1341615020780517_7101806636583850352_n.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}

