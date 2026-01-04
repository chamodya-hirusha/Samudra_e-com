"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Custom Orders", path: "/custom-order" },
  { name: "Our Collection", path: "/shop" },
  { name: "Our Work", path: "/gallery" },
  { name: "Get In Touch", path: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isProductPage = pathname?.startsWith("/product/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = isScrolled || isProductPage
    ? "bg-black/40 backdrop-blur-md shadow-md border-b border-white/10"
    : "bg-transparent border-transparent";

  const textColor = isScrolled || isProductPage ? "text-cream" : "text-white";
  const navTextColor = isScrolled || isProductPage ? "text-cream/80" : "text-white/80";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/logo/500466709_1341615020780517_7101806636583850352_n.jpg"
              alt="Samudra Art Center Logo"
              width={48}
              height={48}
              className="object-contain rounded-full border-2 border-white/20"
            />
            <div className="hidden sm:block">
              <h1 className={`font-serif text-xl font-semibold ${textColor}`}>Samudra Art Center</h1>
              <p className={`text-xs tracking-wider ${navTextColor}`}>Sri Lankan Craftsmanship</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <nav className="flex items-center gap-4 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : navTextColor}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Phone Number & Request Quote */}
            <div className="flex items-center gap-2 xl:gap-4 pl-4 xl:pl-8 border-l border-white/20">
              <a
                href="tel:+94722890068"
                className={`flex items-center gap-1 xl:gap-2 text-sm transition-colors hover:text-primary ${navTextColor}`}
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="hidden xl:inline">072 289 0068</span>
                <span className="xl:hidden">Call</span>
              </a>
              <Button size="sm" className="text-xs xl:text-sm bg-primary hover:text-black " asChild>
                <Link href="/custom-order" className="hover:text-black">Request Quote</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 hover:bg-[#fac528] ${textColor}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-earth border-b border-white/10"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium py-2 transition-colors hover:text-white ${isActive ? 'text-primary' : navTextColor}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-white/10">
                <a href="tel:+94722890068" className="flex items-center gap-2 text-cream/80 mb-4">
                  <Phone className="w-4 h-4" />
                  072 289 0068
                </a>
                <Button className="w-full bg-primary hover:bg-primary hover:text-black" asChild>
                  <Link href="/custom-order" onClick={() => setIsMenuOpen(false)}>Request Quote</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
