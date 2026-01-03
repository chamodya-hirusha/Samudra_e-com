"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";

export function HeroSection() {
   return (
     <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden mb-12 md:mb-0">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-buddha.jpg"
          alt="Buddha statue in serene garden"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-earth/90 via-earth/70 to-earth/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mt-20 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mt-4 md:mt-0 mb-6 backdrop-blur-sm border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Handcrafted in Sri Lanka
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-cream leading-tight mb-6"
          >
            Crafting Divine Art
            <span className="block text-gradient-gold mt-2">
              With Devotion & Precision
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-cream/80 mb-8 leading-relaxed max-w-xl"
          >
            Experience the sacred artistry of Samudra Art Center. From majestic temple 
            Buddha statues to bespoke home sculptures, each piece embodies centuries 
            of Sri Lankan sculptural heritage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" className="w-full sm:w-auto text-sm" asChild>
              <Link href="/shop">
                <ShoppingBag className="mr-2 w-5 h-5" />
                Shop Collection
              </Link>
            </Button>
            <Button variant="hero-outline" className="w-full text-sm sm:w-auto text-white hover:bg-transparent" asChild>
              <Link href="/custom-order">
                Request Custom Order
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 md:mt-12 lg:mt-16 flex flex-wrap gap-6 md:gap-8 lg:gap-12"
          >
            {[
              { value: "28+", label: "Years Experience" },
              { value: "500+", label: "Statues Crafted" },
              { value: "50+", label: "Temple Projects" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs md:text-sm text-cream/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-cream/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-cream/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
