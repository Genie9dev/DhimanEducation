import type { Metadata } from "next";
import { Inter, Noto_Sans_Gujarati } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ConditionalShell } from "@/components/ConditionalShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoGujarati = Noto_Sans_Gujarati({
  variable: "--font-noto-gujarati",
  subsets: ["gujarati", "latin"],
});

export const metadata: Metadata = {
  title: "Dhiman Education | Best Tuition Classes in Unjha",
  description: "Premier coaching institute in Unjha for Std 6-10 and 11-12 (Commerce & Arts) GSEB board exams. Experienced teachers, personal attention, and proven results.",
  keywords: [
    "Best Tuition Classes in Unjha",
    "Commerce Coaching in Unjha",
    "GSEB Coaching Classes",
    "Board Exam Preparation Classes",
    "Tuition Classes Near Visnagar Road",
    "Dhiman Education",
    "Arts Coaching Unjha"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${notoGujarati.variable}`}>
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <ConditionalShell>
              {children}
            </ConditionalShell>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
