"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-24 mb-12 md:mb-0">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Our Collection
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-2">
            Featured Masterpieces
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Discover our finest Buddha statues and sculptures, each piece crafted with devotion 
            and meticulous attention to detail.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="gold-outline" size="lg" asChild>
            <Link href="/shop">
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
