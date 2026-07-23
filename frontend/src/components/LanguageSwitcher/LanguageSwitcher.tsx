"use client";

import { useRouter, usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: 'ru' | 'en') => {
    setLocale(newLocale);
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className={styles["language-switcher"]}>
      <Languages size={18} strokeWidth={1.5} />
      <button
        className={`${styles["language-switcher__button"]} ${locale === 'ru' ? styles["language-switcher__button--active"] : ''}`}
        onClick={() => switchLocale('ru')}
        aria-label="Switch to Russian"
      >
        RU
      </button>
      <button
        className={`${styles["language-switcher__button"]} ${locale === 'en' ? styles["language-switcher__button--active"] : ''}`}
        onClick={() => switchLocale('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};
