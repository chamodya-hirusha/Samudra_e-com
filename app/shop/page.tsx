"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialMaterial = searchParams.get("material");

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    initialMaterial ? [initialMaterial] : []
  );

  const maxPrice = Math.max(...products.flatMap((p) => p.sizes.map((s) => s.price)));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Material filter
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) {
        return false;
      }

      // Price filter
      const productMinPrice = Math.min(...product.sizes.map((s) => s.price));
      const productMaxPrice = Math.max(...product.sizes.map((s) => s.price));
      if (productMaxPrice < priceRange[0] || productMinPrice > priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [selectedMaterials, priceRange]);

  const hasActiveFilters = selectedMaterials.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice;

  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Filters */}
          <ProductFilters
            selectedMaterials={selectedMaterials}
            setSelectedMaterials={setSelectedMaterials}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            maxPrice={maxPrice}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
          />

          {/* Products Grid */}
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-8">
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMobileOpen(true)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {selectedMaterials.length + (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0)}
                    </span>
                  )}
                </Button>
              </div>
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products match your filters.</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ShopPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Buddha Statues & Sculptures"
        subtitle="Our Collection"
        description="Explore our handcrafted collection of Buddha statues and artistic sculptures, each piece created with devotion and precision by our master artisans."
        imageSrc="/assets/products/buddha-face-1.jpg"
      />

      {/* Shop Grid */}
      <Suspense fallback={<div className="py-16 text-center">Loading...</div>}>
        <ShopContent />
      </Suspense>
    </>
  );
}

