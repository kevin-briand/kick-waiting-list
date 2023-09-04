import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationFr from './fr/translation.json';
import translationEn from './en/translation.json';

const resources = {
  fr: {
    translation: translationFr,
  },
  en: {
    translation: translationEn,
  },
} as const;

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  resources,
  returnNull: false,
  keySeparator: '.',
});
