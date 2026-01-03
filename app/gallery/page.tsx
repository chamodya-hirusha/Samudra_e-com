"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const galleryItems = [
  { id: 1, image: "/assets/hero-buddha.jpg", title: "Temple Buddha Installation", category: "Temple Projects" },
  { id: 2, image: "/assets/products/dolomite-buddha-1.jpg", title: "Meditation Buddha - Dolomite", category: "Buddha Statues" },
  { id: 3, image: "/assets/products/fiber-buddha-1.jpg", title: "Artistic Buddha Head", category: "Sculptures" },
  { id: 4, image: "/assets/products/concrete-buddha-1.jpg", title: "Garden Buddha - Concrete", category: "Outdoor" },
  { id: 5, image: "/assets/products/standing-buddha-1.jpg", title: "Standing Buddha - Blessing", category: "Buddha Statues" },
  { id: 6, image: "/assets/products/buddha-face-1.jpg", title: "Museum Quality Face", category: "Art Pieces" },
];

export default function GalleryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Duplicate items for demonstration purposes
  const allGalleryItems = [
    ...galleryItems,
    ...galleryItems.map(item => ({ ...item, id: item.id + 6 })),
    ...galleryItems.map(item => ({ ...item, id: item.id + 12 })),
  ];

  const totalPages = Math.ceil(allGalleryItems.length / itemsPerPage);

  const currentItems = allGalleryItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Gallery of Completed Works"
        subtitle="Our Work"
        description="Explore our portfolio of handcrafted Buddha statues and sculptures delivered to temples, hotels, and homes across Sri Lanka and beyond."
        imageSrc="/assets/products/buddha-face-1.jpg"
      />

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-xs text-primary font-medium uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-cream mt-1">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) handlePageChange(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>
    </>
  );
}

