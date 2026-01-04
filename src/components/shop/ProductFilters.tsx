"use client";

import { materials, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductFiltersProps {
  selectedMaterials: string[];
  setSelectedMaterials: (materials: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  maxPrice: number;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function ProductFilters({
  selectedMaterials,
  setSelectedMaterials,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  maxPrice,
  isMobileOpen,
  setIsMobileOpen,
}: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const toggleMaterial = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedCategories([]);
    setLocalPriceRange([0, maxPrice]);
    setPriceRange([0, maxPrice]);
  };

  const hasActiveFilters = selectedMaterials.length > 0 || selectedCategories.length > 0 || localPriceRange[0] > 0 || localPriceRange[1] < maxPrice;

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-serif font-semibold text-lg mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-3">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <Label
                htmlFor={category.id}
                className="text-sm font-normal cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div>
        <h3 className="font-serif font-semibold text-lg mb-4">Material</h3>
        <div className="space-y-3">
          {materials.map((material) => (
            <div key={material} className="flex items-center space-x-3">
              <Checkbox
                id={material}
                checked={selectedMaterials.includes(material)}
                onCheckedChange={() => toggleMaterial(material)}
              />
              <Label
                htmlFor={material}
                className="text-sm font-normal cursor-pointer"
              >
                {material}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-serif font-semibold text-lg mb-2">Price Range</h3>
        <hr className="border-double border-gray-300 mb-4" />
        <div className="space-y-4">
          <Slider
            value={localPriceRange}
            min={0}
            max={maxPrice}
            step={5000}
            onValueChange={(value) => setLocalPriceRange(value as [number, number])}
            onValueCommit={(value) => setPriceRange(value as [number, number])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Rs. {localPriceRange[0].toLocaleString()}</span>
            <span>Rs. {localPriceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28 bg-card rounded-xl p-6 shadow-soft">
          <h2 className="font-serif text-xl font-semibold mb-6">Filters</h2>
          <FilterContent />
        </div>
      </div>


      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl p-6 z-50 lg:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-semibold">Filters</h2>
                <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded hover:bg-[#fac528]">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterContent />
              <Button
                variant="gold"
                className="w-full mt-6"
                onClick={() => setIsMobileOpen(false)}
              >
                Apply Filters
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
