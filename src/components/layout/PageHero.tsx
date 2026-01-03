"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
    title: string;
    description?: string;
    imageSrc: string;
    subtitle?: string;
}

export function PageHero({ title, description, imageSrc, subtitle }: PageHeroProps) {
    return (
        <section className="relative h-[50vh] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto"
                >
                    {subtitle && (
                        <span className="inline-block text-primary-foreground/90 font-medium tracking-wider uppercase text-xs sm:text-sm mb-3 sm:mb-4 px-3 sm:px-4 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
                            {subtitle}
                        </span>
                    )}
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto px-2">
                            {description}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
