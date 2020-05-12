import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import common_en from 'translations/en/common.json';
import common_pl from 'translations/pl/common.json';
import material_table_en from 'translations/en/material-table.json';
import material_table_pl from 'translations/pl/material-table.json';
import data_en from 'translations/en/data.json';
import data_pl from 'translations/pl/data.json';
import routes_pl from 'translations/pl/routes.json';
import routes_en from 'translations/en/routes.json';
import { yup } from '@dnb/common';

const isProd = process.env.REACT_APP_NODE_ENV === 'production';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',
    debug: !isProd,
    resources: {
      en: {
        ...common_en,
        yup: yup.en,
        material_table: material_table_en,
        data: data_en,
        routes: routes_en,
      },
      pl: {
        ...common_pl,
        yup: yup.pl,
        material_table: material_table_pl,
        data: data_pl,
        routes: routes_pl,
      },
    },
  });

export default i18n;
