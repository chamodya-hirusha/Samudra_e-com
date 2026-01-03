"use client";

import { motion } from "framer-motion";
import { Handshake, Palette, Truck, Shield } from "lucide-react";

const badges = [
  {
    icon: Handshake,
    title: "Handcrafted",
    description: "By master artisans",
  },
  {
    icon: Palette,
    title: "Sri Lankan Art",
    description: "Authentic heritage",
  },
  {
    icon: Truck,
    title: "Custom Sizes",
    description: "Made to order",
  },
  {
    icon: Shield,
    title: "Quality Promise",
    description: "Built to last",
  },
];

export function TrustBadges() {
  return (
    <section className="py-16 bg-secondary/50 mb-12 md:mb-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mb-4 shadow-gold">
                <badge.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-serif font-semibold text-foreground">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
