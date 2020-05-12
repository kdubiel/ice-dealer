import { TFunction } from 'i18next';
import { isString } from 'lodash';

interface TranslationObject {
  prefix?: string;
  text: string;
  t: TFunction;
}

const getTranslatedValue = ({ prefix, text, t }: TranslationObject) => {
  const key = `${prefix && prefix + ':'}${text.toLowerCase()}`;

  return t(key).toLowerCase();
};

export const materialTableFilterText = (
  filter: string,
  data: string | TranslationObject
) => {
  const value = isString(data) ? data : getTranslatedValue(data);

  return value.includes(filter.toLowerCase());
};
