"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Award } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ResultsPage() {
  const { t } = useLanguage();
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const toppers = [
    { name: "Student Name 1", score: "98%", subject: "Commerce", year: "2024" },
    { name: "Student Name 2", score: "97%", subject: "Std 10", year: "2024" },
    { name: "Student Name 3", score: "95%", subject: "Arts", year: "2024" },
    { name: "Student Name 4", score: "94%", subject: "Commerce", year: "2024" },
    { name: "Student Name 5", score: "93%", subject: "Std 10", year: "2024" },
    { name: "Student Name 6", score: "92%", subject: "Commerce", year: "2024" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-slate-900 py-20 text-slate-50 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Trophy className="w-[500px] h-[500px]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <Trophy className="h-12 w-12 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-secondary"
          >
            {t("results.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-50 text-xl font-bold max-w-2xl mx-auto bg-white/10 py-3 px-6 rounded-lg border border-white/20"
          >
            {t("results.desc")}
          </motion.p>
        </div>
      </section>

      {/* Hall of Fame */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("results.hof")}</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">{t("results.hofDesc")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {toppers.map((topper, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center relative hover:shadow-lg transition-shadow group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/10 rounded-bl-full flex items-start justify-end p-3 z-0">
                  <Star className="h-5 w-5 text-secondary" />
                </div>
                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto bg-primary/5 rounded-full border-4 border-background shadow-md mb-4 flex items-center justify-center overflow-hidden">
                    <span className="text-foreground/30 text-xs">Photo</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-1">{topper.name}</h3>
                  <p className="text-sm text-foreground/60 mb-4">{topper.subject} • {topper.year}</p>
                  <div className="inline-flex items-center justify-center gap-2 bg-secondary/20 text-secondary-foreground font-bold px-4 py-2 rounded-full w-full">
                    <Award className="h-5 w-5 text-secondary" />
                    <span className="text-lg">{topper.score}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Callout */}
      <section className="py-20 bg-primary/5 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">{t("results.summary")}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-card border border-border p-6 rounded-xl min-w-[200px]">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-foreground/70 text-sm">{t("results.s1")}</div>
            </div>
            <div className="bg-card border border-border p-6 rounded-xl min-w-[200px]">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-foreground/70 text-sm">{t("results.s2")}</div>
            </div>
            <div className="bg-card border border-border p-6 rounded-xl min-w-[200px]">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-foreground/70 text-sm">{t("results.s3")}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
