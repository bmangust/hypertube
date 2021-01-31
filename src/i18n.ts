import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'en',
    fallbackLng: 'en',
    backend: {
      loadPath: 'http://localhost:3000/locales/{{lng}}/{{ns}}.json',
    },
    detection: ['queryString', 'cookie'],
    cache: ['cookie'],
    debug: true,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
