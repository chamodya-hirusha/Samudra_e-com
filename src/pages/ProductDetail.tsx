import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ShoppingCart, Truck, Shield, ArrowLeft, Check } from "lucide-react";

// Import product images
import dolomiteBuddha from "@/assets/products/dolomite-buddha-1.jpg";
import fiberBuddha from "@/assets/products/fiber-buddha-1.jpg";
import concreteBuddha from "@/assets/products/concrete-buddha-1.jpg";
import standingBuddha from "@/assets/products/standing-buddha-1.jpg";
import buddhaFace from "@/assets/products/buddha-face-1.jpg";

const imageMap: Record<string, string> = {
  "/products/dolomite-buddha-1.jpg": dolomiteBuddha,
  "/products/fiber-buddha-1.jpg": fiberBuddha,
  "/products/concrete-buddha-1.jpg": concreteBuddha,
  "/products/standing-buddha-1.jpg": standingBuddha,
  "/products/buddha-face-1.jpg": buddhaFace,
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button variant="gold" asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const imageSrc = imageMap[product.images[0]] || product.images[0];
  const currentPrice = product.sizes[selectedSize].price;

  const materialColors = {
    Dolomite: "bg-cream-dark text-earth",
    Fiber: "bg-terracotta/20 text-terracotta",
    Concrete: "bg-muted text-muted-foreground",
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link
            to="/shop"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={imageSrc}
                  alt={product.name}
                  className="w-full h-full object-cover"
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
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size, index) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(index)}
                      className={`px-6 py-3 rounded-lg border-2 transition-all ${
                        selectedSize === index
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="block font-medium">{size.label}</span>
                      <span className="text-sm text-muted-foreground">
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
                <div className="flex flex-wrap gap-3">
                  {product.finishes.map((finish, index) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(index)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedFinish === index
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="bg-secondary/50 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Selected Price</span>
                  <span className="font-serif text-3xl font-bold text-primary">
                    Rs. {currentPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="w-4 h-4" />
                  Delivery: {product.deliveryTime}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="gold" size="xl" className="flex-1" asChild>
                  <Link to="/custom-order">
                    <ShoppingCart className="mr-2 w-5 h-5" />
                    Create Order
                  </Link>
                </Button>
                <Button variant="gold-outline" size="xl" asChild>
                  <Link to="/custom-order">
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
      </section>
    </Layout>
  );
};

export default ProductDetail;
