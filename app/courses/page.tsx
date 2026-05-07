"use client";

import { motion } from "framer-motion";
import { CheckCircle, BookOpen, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CoursesPage() {
  const { t } = useLanguage();
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const courses = [
    {
      title: t("home.courses.c1.title"),
      description: t("courses.c1.desc"),
      color: "bg-blue-500",
      subjects: t("home.courses.c1.desc").split(", "),
      features: [
        t("about.philosophy.p1.title"),
        t("about.philosophy.p4.title"),
        t("home.features.f1.title"),
        t("about.philosophy.p3.title")
      ],
      timing: "4:00 PM - 7:00 PM"
    },
    {
      title: t("home.courses.c2.title"),
      description: t("courses.c2.desc"),
      color: "bg-secondary",
      subjects: t("home.courses.c2.desc").split(", "),
      features: [
        t("home.features.f2.title"),
        t("home.features.f5.title"),
        t("about.philosophy.p4.title"),
        t("home.features.f6.title")
      ],
      timing: "7:00 AM - 11:00 AM"
    },
    {
      title: t("home.courses.c3.title"),
      description: t("courses.c3.desc"),
      color: "bg-purple-500",
      subjects: t("home.courses.c3.desc").split(", "),
      features: [
        t("about.philosophy.p3.title"),
        t("home.features.f6.title"),
        t("about.philosophy.p4.title"),
        t("home.features.f5.title")
      ],
      timing: "4:00 PM - 8:00 PM"
    }
  ];

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
            {t("courses.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg max-w-2xl mx-auto"
          >
            {t("courses.desc")}
          </motion.p>
        </div>
      </section>

      {/* Course List */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl space-y-16">
          {courses.map((course, index) => (
            <motion.div 
              key={index}
              {...fadeInUp}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row group hover:shadow-md transition-all"
            >
              {/* Left Color Bar & Mobile Header */}
              <div className={`${course.color} p-8 md:w-1/3 flex flex-col justify-center text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
                  <BookOpen className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
                  <div className="flex items-center gap-2 font-medium bg-white/20 w-fit px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                    <Clock className="w-4 h-4" />
                    <span>{course.timing}</span>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="p-8 md:w-2/3 flex flex-col">
                <p className="text-foreground/70 text-lg mb-8">
                  {course.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-8 mb-8 flex-grow">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-secondary" />
                      Subjects
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {course.subjects.map((subject, i) => (
                        <span key={i} className="bg-primary/5 border border-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-secondary" />
                      {t("courses.features")}
                    </h3>
                    <ul className="space-y-2">
                      {course.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-border mt-auto">
                  <Button asChild>
                    <Link href={`/contact?course=${encodeURIComponent(course.title)}`}>{t("courses.enquire")}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
