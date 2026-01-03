"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "dolomite",
    name: "Dolomite Statues",
    description: "Premium white stone with natural elegance",
    image: "/assets/products/dolomite-buddha-1.jpg",
    link: "/shop?material=Dolomite",
  },
  {
    id: "fiber",
    name: "Fiber Sculptures",
    description: "Durable and lightweight, perfect for any space",
    image: "/assets/products/fiber-buddha-1.jpg",
    link: "/shop?material=Fiber",
  },
  {
    id: "concrete",
    name: "Concrete Creations",
    description: "Weather-resistant for outdoor sanctuaries",
    image: "/assets/products/concrete-buddha-1.jpg",
    link: "/shop?material=Concrete",
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-24 bg-background mb-12 md:mb-0">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Materials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-2">
            Explore By Material
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Each material offers unique characteristics suited for different settings 
            and purposes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Link
                href={category.link}
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-cream mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm md:text-base text-cream/70 mb-4">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all text-sm md:text-base">
                    Explore Collection
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-secondary/50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Need Something Unique?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our master artisans can bring your vision to life. From custom sizes 
              to bespoke designs, we create one-of-a-kind sculptures tailored to your space.
            </p>
            <Button variant="gold" size="lg" asChild>
              <Link href="/custom-order">
                Request Custom Order
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
