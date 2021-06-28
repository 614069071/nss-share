import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

// console.log(i18n.changeLanguage);//设置语言方法

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector //识别浏览器语言
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {
        translations: require("./index.json").en,//translations is namespace
      },
      zh: {
        translations: require("./index.json").zh,
      },
    },
    // fallbackLng: 'zh-CN',
    // fallbackLng: localStorage.getItem("lang") === "en" ? "en" : "zh",//设置默认语言
    fallbackLng: "zh",
    debug: true,
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      wait: true,
    },
  });

export default i18n;
