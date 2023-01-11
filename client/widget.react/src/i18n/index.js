import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import default_en from './locales/en/translation.json';
import default_ja from './locales/ja/translation.json';
// import header_en from '@/widgets/header/locales/en.json';
// import header_ja from '@/widgets/header/locales/ja.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...default_en,
          // header: header_en,
        },
      },
      ja: {
        translation: {
          ...default_ja,
          // header: header_ja,
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

export default i18n;
