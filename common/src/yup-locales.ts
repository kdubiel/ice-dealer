import { i18n } from 'i18next';
import { setLocale } from 'yup';

export const initializeYupLocales = (i18n: i18n) =>
  setLocale({
    mixed: {
      default: i18n.t('yup:mixed:default'),
      required: i18n.t('yup:mixed:required'),
      oneOf: i18n.t('yup:mixed:oneof'),
      notOneOf: i18n.t('yup:mixed:notoneof'),
      notType: i18n.t('yup:mixed:nottype')
    },
    string: {
      length: ({ length }) => i18n.t('yup:string:length', { length }),
      min: ({ min }) => i18n.t('yup:string:min', { min }),
      max: ({ max }) => i18n.t('yup:string:max', { max }),
      matches: ({ regex }) => i18n.t('yup:string:matches', { regex }),
      email: ({ regex }) => i18n.t('yup:string:email', { regex }),
      url: ({ regex }) => i18n.t('yup:string:url', { regex }),
      trim: i18n.t('yup:string:trim'),
      lowercase: i18n.t('yup:string:lowercase'),
      uppercase: i18n.t('yup:string:uppercase')
    },
    number: {
      min: ({ min }) => i18n.t('yup:number:min', { min }),
      max: ({ max }) => i18n.t('yup:number:max', { max }),
      lessThan: ({ less }) => i18n.t('yup:number:lessthan', { less }),
      moreThan: ({ more }) => i18n.t('yup:number:morethan', { more }),
      positive: ({ more }) => i18n.t('yup:number:positive', { more }),
      negative: ({ less }) => i18n.t('yup:number:negative', { less }),
      integer: i18n.t('yup:number:integer')
    },
    date: {
      min: ({ min }) => i18n.t('yup:date:min', { min }),
      max: ({ max }) => i18n.t('yup:date:max', { max })
    },
    object: {
      noUnknown: i18n.t('yup:object:nounknown')
    },
    array: {
      min: ({ min }) => i18n.t('yup:array:min', { min }),
      max: ({ max }) => i18n.t('yup:array:max', { max })
    }
  });
