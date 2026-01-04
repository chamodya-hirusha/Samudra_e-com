"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ShoppingCart, Truck, Shield, ArrowLeft, Check } from "lucide-react";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { ProductCard } from "@/components/shop/ProductCard";

const imageMap: Record<string, string> = {
  "/products/dolomite-buddha-1.jpg": "/assets/products/dolomite-buddha-1.jpg",
  "/products/fiber-buddha-1.jpg": "/assets/products/fiber-buddha-1.jpg",
  "/products/concrete-buddha-1.jpg": "/assets/products/concrete-buddha-1.jpg",
  "/products/standing-buddha-1.jpg": "/assets/products/standing-buddha-1.jpg",
  "/products/buddha-face-1.jpg": "/assets/products/buddha-face-1.jpg",
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
        <Button variant="gold" asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const imageSrc = imageMap[product.images[0]] || product.images[0];
  const currentPrice = product.sizes[selectedSize].price;

  const materialColors = {
    Dolomite: "bg-cream-dark text-earth",
    Fiber: "bg-terracotta/20 text-terracotta",
    Concrete: "bg-muted text-muted-foreground",
  };

  // Filter related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // If not enough related products, just fill with others
  if (relatedProducts.length < 3) {
    const others = products
      .filter((p) => p.id !== product.id && !relatedProducts.some((rp) => rp.id === p.id))
      .slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...others);
  }

  return (
    <>
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link
            href="/shop"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 md:mb-16"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted relative">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-gradient-gold text-primary-foreground border-0">
                  Featured
                </Badge>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <Badge variant="secondary" className={`w-fit ${materialColors[product.material]}`}>
                {product.material}
              </Badge>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
                {product.name}
              </h1>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select Size
                </label>
                <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2 sm:gap-3">
                  {product.sizes.map((size, index) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(index)}
                      className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 transition-all text-sm sm:text-base ${selectedSize === index
                        ? "border-primary bg-primary/10 text-black hover:bg-[#fac528]"
                        : "border-border hover:border-primary/50 hover:bg-[#fac528]"
                        }`}
                    >
                      <span className="block font-medium">{size.label}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Rs. {size.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Finish Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select Finish
                </label>
                <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2 sm:gap-3">
                  {product.finishes.map((finish, index) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(index)}
                      className={`w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg border-2 transition-all text-sm sm:text-base ${selectedFinish === index
                        ? "border-primary bg-primary/10 text-black hover:bg-[#fac528]"
                        : "border-border hover:border-primary/50 hover:bg-[#fac528]"
                        }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="bg-secondary/50 rounded-xl p-4 sm:p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm sm:text-base text-muted-foreground">Selected Price</span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                    Rs. {currentPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Truck className="w-4 h-4" />
                  Delivery: {product.deliveryTime}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  variant="gold"
                  size="xl"
                  className="w-full sm:flex-1"
                  onClick={() => setIsPaymentModalOpen(true)}
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Create Order
                </Button>
                <Button variant="gold-outline" size="xl" className="w-full sm:flex-1" asChild>
                  <Link href="/custom-order">
                    Request Custom Size
                  </Link>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 pt-8 border-t border-border">
                {[
                  { icon: Shield, text: "Quality Guaranteed" },
                  { icon: Truck, text: "Secure Delivery" },
                  { icon: Check, text: "Handcrafted" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="w-4 h-4 text-primary" />
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Payment Modal */}
        <PaymentModal
          open={isPaymentModalOpen}
          onOpenChange={setIsPaymentModalOpen}
          productName={product.name}
          price={currentPrice}
          selectedSize={product.sizes[selectedSize].label}
          selectedFinish={product.finishes[selectedFinish]}
        />
      </section>

      {/* Related Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

