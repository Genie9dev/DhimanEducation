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
    { name: "Suthar Dev", score: "96.40 PR", subject: "12 Commerce", year: "2024" },
    { name: "Patel Hetvi", score: "95.12 PR", subject: "Std 10", year: "2024" },
    { name: "Rami Kavya", score: "94.88 PR", subject: "12 Arts", year: "2024" },
    { name: "Soni Mann", score: "92.30 PR", subject: "12 Commerce", year: "2024" },
    { name: "Thakor Aryan", score: "91.15 PR", subject: "Std 10", year: "2024" },
    { name: "Patel Dhruvi", score: "90.05 PR", subject: "12 Commerce", year: "2024" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white text-center relative overflow-hidden">
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-lg md:text-xl font-bold max-w-2xl mx-auto bg-white/10 py-4 px-6 rounded-2xl border border-white/20 backdrop-blur-sm"
          >
            {t("results.desc")}
          </motion.div>
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
                className="bg-card border border-border rounded-3xl p-6 text-center relative hover:shadow-lg transition-all group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/10 rounded-bl-full flex items-start justify-end p-3 z-0">
                  <Star className="h-5 w-5 text-secondary" />
                </div>
                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto bg-primary/5 rounded-full border-4 border-background shadow-md mb-4 flex items-center justify-center overflow-hidden">
                    <Trophy className="h-10 w-10 text-primary/20" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-1">{topper.name}</h3>
                  <p className="text-sm text-foreground/60 mb-4">{topper.subject} • {t("results.year")} {topper.year}</p>
                  <div className="inline-flex items-center justify-center gap-2 bg-secondary/20 text-secondary-foreground font-bold px-4 py-3 rounded-2xl w-full">
                    <Award className="h-5 w-5 text-secondary" />
                    <span className="text-xl">{topper.score}</span>
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
          <h2 className="text-2xl font-bold mb-12">{t("results.summary")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                {...fadeInUp} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-8 rounded-3xl shadow-sm"
              >
                <div className="text-5xl font-bold text-primary mb-3">{t(`results.s${i}.val`)}</div>
                <div className="text-foreground/70 font-medium">{t(`results.s${i}.label`)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
