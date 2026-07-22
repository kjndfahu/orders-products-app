import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from 'next/navigation';
import "../globals.scss";
import styles from "../layout.module.scss";
import { TopMenu } from "@/components/TopMenu";
import { NavigationMenu } from "@/components/NavigationMenu";
import { StoreProvider } from "@/providers/StoreProvider";
import { I18nProvider } from "@/contexts/I18nContext";

const locales = ['ru', 'en'] as const;
type Locale = (typeof locales)[number];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orders Products App",
  description: "Управление заказами и товарами",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <I18nProvider initialLocale={locale as Locale}>
          <StoreProvider>
            <div className={styles.shell}>
              <TopMenu />

              <div className={styles.body}>
                <NavigationMenu />

                <main className={styles.main} id="main-content">
                  <div className={styles.content}>{children}</div>
                </main>
              </div>
            </div>
          </StoreProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
