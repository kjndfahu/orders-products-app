import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import styles from "./layout.module.scss";
import { TopMenu } from "@/components/TopMenu";
import { NavigationMenu } from "@/components/NavigationMenu";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <div className={styles.shell}>
          <TopMenu />

          <div className={styles.body}>
            <NavigationMenu />

            <main className={styles.main} id="main-content">
              <div className={styles.content}>{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
