"use client";

import Link from "next/link";
import { BookOpen, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-50 border-t border-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-slate-800 text-slate-50 p-1.5 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-50">
                Dhiman<span className="text-secondary">Education</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-4">
              {t("footer.desc")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-secondary">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3">
              {[
                { name: t("nav.home"), path: "/" },
                { name: t("nav.about"), path: "/about" },
                { name: t("nav.courses"), path: "/courses" },
                { name: t("nav.results"), path: "/results" },
                { name: t("nav.gallery"), path: "/gallery" }
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className="text-slate-400 hover:text-secondary transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-secondary">{t("footer.ourCourses")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="text-slate-400 hover:text-secondary transition-colors text-sm">
                  {t("home.courses.c1.title")}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-slate-400 hover:text-secondary transition-colors text-sm">
                  {t("home.courses.c2.title")}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-slate-400 hover:text-secondary transition-colors text-sm">
                  {t("home.courses.c3.title")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-secondary">{t("footer.contactUs")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span>{t("footer.address").split(', ').map((line, i) => <span key={i}>{line}<br/></span>)}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+917698679435" className="hover:text-secondary transition-colors">+91 76986 79435</a>
                  <a href="tel:+919081307387" className="hover:text-secondary transition-colors">+91 90813 07387</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <a href="mailto:info@dhimaneducation.com" className="hover:text-secondary transition-colors">info@dhimaneducation.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Dhiman Education. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/student/login" className="text-sm text-slate-500 hover:text-secondary transition-colors">
              {t("footer.studentPortal")}
            </Link>
            <Link href="/student/register" className="text-sm text-slate-500 hover:text-secondary transition-colors">
              Student Register
            </Link>
            <Link href="/admin/login" className="text-sm text-slate-500 hover:text-secondary transition-colors">
              {t("footer.adminPortal")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
