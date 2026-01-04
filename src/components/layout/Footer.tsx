import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { name: "Buddha Statues", path: "/shop?category=buddha-statues" },
  { name: "Custom Orders", path: "/custom-order" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact Us", path: "/contact" },
];

const materials = [
  { name: "Dolomite Statues", path: "/shop?material=Dolomite" },
  { name: "Fiber Sculptures", path: "/shop?material=Fiber" },
  { name: "Concrete Creations", path: "/shop?material=Concrete" },
];

export function Footer() {
  return (
    <footer className="text-cream" style={{ backgroundColor: '#151c26' }}>
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Image
                src="/assets/logo/500466709_1341615020780517_7101806636583850352_n.jpg"
                alt="Samudra Art Center Logo"
                width={48}
                height={48}
                className="object-contain rounded-full"
              />
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-semibold">Samudra Art Center</h3>
                <p className="text-xs text-cream/70 tracking-wider">Sri Lankan Craftsmanship</p>
              </div>
            </div>
            <p className="text-cream/80 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              Crafting divine art with devotion and precision since 1995.
              Each piece is handcrafted by master artisans preserving Sri Lanka's rich sculptural heritage.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.facebook.com/SamudraArtCenter/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-cream/80 hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold mb-4 sm:mb-6">Our Materials</h4>
            <ul className="space-y-2 sm:space-y-3">
              {materials.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-cream/80 hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contact Us</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-cream/80 text-xs sm:text-sm">
                  Nittambuwa,<br />
                  Sri Lanka
                </span>
              </li>
              <li>
                <a href="tel:+94722890068" className="flex items-center gap-2 sm:gap-3 text-cream/80 hover:text-primary transition-colors text-xs sm:text-sm">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  072 289 0068
                </a>
              </li>
              <li>
                <a href="mailto:info@samudraart.lk" className="flex items-center gap-2 sm:gap-3 text-cream/80 hover:text-primary transition-colors text-xs sm:text-sm">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  info@samudraart.lk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-cream/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-cream/60 text-sm">
                © 2026 Samudra Art Center. All rights reserved.
              </p>
              <p className="text-cream/40 text-xs">
                Developed by <a href="https://www.braintisa.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">braintisa</a>
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-xs sm:text-sm text-cream/60">
              <Link href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-cream transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
