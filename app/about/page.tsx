"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-slate-900 py-20 text-slate-50 text-center">
        <div className="container mx-auto px-4">
          <motion.h1 
            {...fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About Dhiman Education
          </motion.h1>
          <motion.p 
            {...fadeInUp} transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg max-w-2xl mx-auto"
          >
            Empowering students with knowledge, discipline, and the guidance needed to excel in GSEB Board Exams.
          </motion.p>
        </div>
      </section>

      {/* Institute Introduction */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 space-y-6"
            >
              <h2 className="text-3xl font-bold text-primary">Our Legacy of Excellence</h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                Located in the heart of Unjha, Dhiman Education has been the cornerstone of academic success for hundreds of students. We specialize in providing top-tier coaching for GSEB Board students from Standard 6 to 12.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                We believe that every student has the potential to achieve greatness. Our approach combines rigorous academic training with personal mentoring, ensuring that our students not only score high marks but also develop a strong foundation for their future careers.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <div className="aspect-video bg-primary/10 rounded-2xl border border-border/50 flex items-center justify-center relative overflow-hidden">
                {/* Placeholder for Institute Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <span className="text-primary/50 font-medium">Institute Image Placeholder</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-card rounded-2xl border border-border shadow-sm"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-foreground/80 leading-relaxed">
                To provide high-quality, result-oriented education that empowers students to achieve their academic goals. We strive to create an environment that fosters intellectual growth, critical thinking, and a lifelong love for learning.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-card rounded-2xl border border-border shadow-sm"
            >
              <h3 className="text-2xl font-bold text-secondary mb-4">Our Vision</h3>
              <p className="text-foreground/80 leading-relaxed">
                To be the most trusted and premier coaching institute in Unjha and surrounding regions, recognized for our commitment to student success, innovative teaching methodologies, and holistic development.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Teaching Philosophy</h2>
            <div className="space-y-6">
              {[
                { title: "Student-Centric Approach", desc: "Every student learns differently. We tailor our teaching methods to accommodate individual learning paces and styles." },
                { title: "Focus on Discipline", desc: "Discipline is the bridge between goals and accomplishment. We maintain strict attendance and behavioral standards." },
                { title: "Conceptual Clarity", desc: "Instead of rote learning, we focus on deep conceptual understanding which helps in long-term retention." },
                { title: "Continuous Evaluation", desc: "Regular testing ensures that students are exam-ready and helps us identify areas needing improvement." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <CheckCircle2 className="h-6 w-6 text-secondary shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-foreground/70">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
