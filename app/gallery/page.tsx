"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

export default function GalleryPage() {
  const categories = ["All", "Classrooms", "Events", "Awards", "Infrastructure"];
  
  // Generating placeholders for the gallery
  const galleryItems = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    category: categories[(i % 4) + 1],
    title: `Gallery Image ${i + 1}`
  }));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-slate-900 py-20 text-slate-50 text-center">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg max-w-2xl mx-auto"
          >
            A glimpse into the vibrant academic life and infrastructure at Dhiman Education.
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          
          {/* Category Filter Placeholder */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button 
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0 
                    ? "bg-secondary text-secondary-foreground" 
                    : "bg-secondary/10 text-foreground hover:bg-secondary/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="group relative aspect-[4/3] bg-primary/5 rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground/30 group-hover:scale-105 transition-transform duration-500">
                  <ImageIcon className="h-12 w-12 mb-2" />
                  <span className="text-sm font-medium">{item.category}</span>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-primary-foreground font-semibold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
