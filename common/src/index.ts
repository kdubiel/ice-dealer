// Yup
export * from './yupSchemas/auth';
export * from './yupSchemas/user';
export * from './yupSchemas/pickupLocation';
export * from './yupSchemas/order';

export { initializeYupLocales } from './yup-locales';

// Translations
import * as pl_yup from './translations/pl/yup.json';
import * as en_yup from './translations/en/yup.json';

export const yup = {
  pl: pl_yup,
  en: en_yup
};
