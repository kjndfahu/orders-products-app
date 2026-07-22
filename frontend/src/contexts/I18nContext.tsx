"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import ruMessages from '../../messages/ru.json';
import enMessages from '../../messages/en.json';

type Locale = 'ru' | 'en';
type Messages = typeof ruMessages;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const messages: Record<Locale, Messages> = {
  ru: ruMessages,
  en: enMessages,
};

export const I18nProvider = ({ children, initialLocale = 'ru' }: { children: ReactNode; initialLocale?: Locale }) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
