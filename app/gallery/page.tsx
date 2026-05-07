"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useState } from "react";

export default function GalleryPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: t("gallery.cat.all") },
    { id: "classes", label: t("gallery.cat.classes") },
    { id: "events", label: t("gallery.cat.events") },
    { id: "awards", label: t("gallery.cat.awards") },
    { id: "infra", label: t("gallery.cat.infra") },
  ];
  
  // Generating placeholders for the gallery
  const galleryItems = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    category: categories[(i % 4) + 1].id,
    categoryLabel: categories[(i % 4) + 1].label,
    title: `Dhiman Education ${i + 1}`
  }));

  const filteredItems = activeTab === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t("nav.gallery")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            {t("gallery.desc")}
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button 
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-8 py-3 rounded-2xl text-sm font-semibold transition-all shadow-sm ${
                  activeTab === category.id 
                    ? "bg-secondary text-secondary-foreground scale-105" 
                    : "bg-primary/5 text-foreground/60 hover:bg-primary/10"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/3] bg-primary/5 rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-border"
              >
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground/20 group-hover:scale-105 transition-transform duration-500">
                  <ImageIcon className="h-16 w-16 mb-2" />
                  <span className="text-sm font-bold uppercase tracking-widest">{item.categoryLabel}</span>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <h3 className="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
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
