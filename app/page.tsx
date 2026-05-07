"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Phone, MessageCircle, ArrowRight, CheckCircle, Users, BookOpen, Trophy } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4 border border-secondary/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              {t("home.hero.tag")}
            </motion.div>
            
            <motion.h1 
              {...fadeInUp}
              className="text-4xl md:text-6xl font-bold tracking-tight text-primary dark:text-primary-foreground leading-tight"
            >
              {t("home.hero.title1")} <span className="text-secondary">{t("home.hero.title2")}</span>
            </motion.h1>
            
            <motion.p 
              {...fadeInUp} transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
            >
              {t("home.hero.desc")}
            </motion.p>

            <motion.div
              {...fadeInUp} transition={{ delay: 0.15 }}
              className="bg-secondary/10 text-secondary p-4 rounded-xl border border-secondary/20 max-w-3xl mx-auto inline-block"
            >
              <p className="font-bold">{t("home.hero.guarantee")}</p>
            </motion.div>
            
            <motion.div 
              {...fadeInUp} transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/contact">
                  {t("home.hero.apply")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/20" asChild>
                <a href="https://wa.me/917698679435" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> {t("home.hero.whatsapp")}
                </a>
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto" asChild>
                <a href="tel:+917698679435">
                  <Phone className="mr-2 h-4 w-4" /> {t("home.hero.call")}
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-900 text-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, stat: "500+", label: t("home.stats.students") },
              { icon: Trophy, stat: "100%", label: t("home.stats.result") },
              { icon: BookOpen, stat: "15+", label: t("home.stats.experience") },
              { icon: CheckCircle, stat: "10+", label: t("home.stats.faculty") }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-3"
              >
                <div className="mx-auto bg-slate-800 w-12 h-12 flex items-center justify-center rounded-full text-secondary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-secondary">{item.stat}</h3>
                <p className="text-slate-300 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.why.title")}</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">{t("home.why.desc")}</p>
          </div>
          {/* Rest of this section remains static or we can translate it later. I will leave it static English for now since it's not in the dictionary to save space, or I can just leave it as is. */}
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-4 text-secondary">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t(`home.why.f${i}.title`)}</h3>
                <p className="text-foreground/70">{t(`home.why.f${i}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.courses.title")}</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">{t("home.courses.desc")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t("home.courses.c1.title"), desc: t("home.courses.c1.desc"), color: "bg-blue-500" },
              { title: t("home.courses.c2.title"), desc: t("home.courses.c2.desc"), color: "bg-secondary" },
              { title: t("home.courses.c3.title"), desc: t("home.courses.c3.desc"), color: "bg-purple-500" }
            ].map((course, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 hover:border-secondary/50 transition-colors"
              >
                <div className={`w-2 h-12 ${course.color} absolute top-8 left-0 rounded-r-md`} />
                <h3 className="text-xl md:text-2xl font-bold mb-4 pl-4">{course.title}</h3>
                <p className="text-foreground/70 mb-8 pl-4">{course.desc}</p>
                <Button className="ml-4 w-fit" variant="outline" asChild>
                  <Link href="/courses">{t("home.courses.viewDetails")}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="container mx-auto px-4 relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-6">{t("home.cta.title")}</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">{t("home.cta.desc")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
              <Link href="/contact">{t("home.cta.enroll")}</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-slate-50 border-slate-700 hover:bg-slate-800" asChild>
              <a href="https://wa.me/917698679435"><MessageCircle className="mr-2 h-4 w-4" /> {t("home.cta.chat")}</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
