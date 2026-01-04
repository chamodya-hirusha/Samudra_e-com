"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const lowestPrice = Math.min(...(product.sizes?.map((s) => s.price) || [0]));
  const imageSrc = product.images?.[0] || "/placeholder.svg";

  const materialColors = {
    Dolomite: "bg-cream-dark text-earth",
    Fiber: "bg-terracotta/20 text-terracotta",
    Concrete: "bg-muted text-muted-foreground",
    Cloth: "bg-amber-100 text-amber-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        href={`/product/${product.id}`}
        className="group block bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-gold text-primary-foreground border-0">
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className={materialColors[product.material]}>
              {product.material}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {product.sizes[0].label} - {product.sizes[product.sizes.length - 1].label}
            </span>
          </div>

          <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground">Starting from</span>
              <p className="font-semibold text-lg text-black">
                Rs. {lowestPrice.toLocaleString()}
              </p>
            </div>
            <span className="text-sm text-black font-medium group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
