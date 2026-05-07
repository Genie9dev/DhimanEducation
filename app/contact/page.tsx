"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type ContactFormData = {
  name: string;
  phone: string;
  course: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
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
            {t("contact.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            {t("contact.desc")}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">{t("contact.getInTouch")}</h2>
                <p className="text-foreground/70 text-lg">
                  {t("contact.getInTouchDesc")}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t("contact.location")}</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {t("footer.address")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-6 rounded-2xl bg-secondary/5 border border-secondary/10">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t("contact.phone")}</h3>
                    <p className="text-foreground/70 leading-relaxed flex flex-col font-medium">
                      <a href="tel:+917698679435" className="hover:text-secondary transition-colors">+91 76986 79435</a>
                      <a href="tel:+919081307387" className="hover:text-secondary transition-colors">+91 90813 07387</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t("contact.email")}</h3>
                    <p className="text-foreground/70 leading-relaxed font-medium">
                      <a href="mailto:info@dhimaneducation.com" className="hover:text-primary transition-colors">info@dhimaneducation.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="font-bold text-lg mb-4">{t("contact.connect")}</h3>
                <Button size="lg" className="bg-[#25D366] text-white hover:bg-[#20bd5a] w-full sm:w-auto rounded-xl" asChild>
                  <a href="https://wa.me/917698679435" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" /> {t("home.cta.chat")}
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-3xl border border-border shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0" />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6">{t("contact.form.title")}</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-500/10 text-green-600 p-8 rounded-2xl border border-green-500/20 text-center space-y-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-600">
                      <Send className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold">{t("contact.form.success")}</h3>
                    <p className="font-medium">{t("contact.form.successDesc")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2">{t("contact.form.name")}</label>
                      <input 
                        id="name"
                        type="text" 
                        className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.name ? 'border-red-500' : 'border-border'}`}
                        placeholder={t("contact.form.nameHolder")}
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">{t("contact.form.phone")}</label>
                      <input 
                        id="phone"
                        type="tel" 
                        className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.phone ? 'border-red-500' : 'border-border'}`}
                        placeholder={t("contact.form.phoneHolder")}
                        {...register("phone", { 
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10,12}$/,
                            message: "Please enter a valid phone number"
                          }
                        })}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="course" className="block text-sm font-semibold mb-2">{t("contact.form.course")}</label>
                      <select 
                        id="course"
                        className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.course ? 'border-red-500' : 'border-border'}`}
                        {...register("course", { required: "Please select a course" })}
                      >
                        <option value="">{t("contact.form.courseHolder")}</option>
                        <option value="std-8-10">{t("home.courses.c1.title")}</option>
                        <option value="std-11-12-commerce">{t("home.courses.c2.title")}</option>
                        <option value="std-11-12-arts">{t("home.courses.c3.title")}</option>
                        <option value="other">{t("contact.form.other")}</option>
                      </select>
                      {errors.course && <p className="text-red-500 text-xs mt-1 font-medium">{errors.course.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold mb-2">{t("contact.form.msg")}</label>
                      <textarea 
                        id="message"
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all ${errors.message ? 'border-red-500' : 'border-border'}`}
                        placeholder={t("contact.form.msgHolder")}
                        {...register("message", { required: "Message is required" })}
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message.message}</p>}
                    </div>

                    <Button type="submit" size="lg" className="w-full rounded-xl py-6 text-lg font-bold shadow-lg" disabled={isSubmitting}>
                      {isSubmitting ? t("contact.form.sending") : (
                        <>{t("contact.form.send")} <Send className="ml-2 h-5 w-5" /></>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4527.41892025419!2d72.3844074!3d23.5967242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c432d04aca5d9%3A0x58e26e9123636c7a!2sDhiman%20Education!5e1!3m2!1sen!2sin!4v1778152131900!5m2!1sen!2sin" 
          className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500" 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
