"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target, Eye, Award } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

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
            {t("about.hero.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            {t("about.hero.desc")}
          </motion.p>
        </div>
      </section>

      {/* Institute Introduction */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold mb-6 text-primary">{t("about.intro.title")}</h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>{t("about.intro.desc1")}</p>
                <p>{t("about.intro.desc2")}</p>
              </div>
            </motion.div>
            <motion.div 
              {...fadeInUp}
              className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800"
            >
              <Image 
                src="/coaching_class_about_1778166146698.png" 
                alt="Dhiman Education Classroom" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              {...fadeInUp}
              className="bg-card p-8 rounded-3xl shadow-sm border border-border flex gap-6"
            >
              <div className="bg-primary/10 p-4 rounded-2xl h-fit">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{t("about.mission.title")}</h3>
                <p className="text-foreground/70">{t("about.mission.desc")}</p>
              </div>
            </motion.div>
            <motion.div 
              {...fadeInUp} transition={{ delay: 0.2 }}
              className="bg-card p-8 rounded-3xl shadow-sm border border-border flex gap-6"
            >
              <div className="bg-secondary/10 p-4 rounded-2xl h-fit">
                <Eye className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{t("about.vision.title")}</h3>
                <p className="text-foreground/70">{t("about.vision.desc")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about.why.title")}</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i}
                {...fadeInUp} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-card p-5 rounded-2xl border border-border hover:shadow-md transition-shadow"
              >
                <div className="bg-green-500/10 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium text-foreground/80">{t(`about.why.f${i}`)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
