import * as yup from 'yup';
import { TFunction } from 'i18next';

export const PickupLocationValidationSchema = (t?: TFunction) =>
  yup.object({
    city: yup
      .string()
      .required()
      .max(32)
      .trim(),
    zipCode: yup
      .string()
      .trim()
      .matches(/^(([0-9]{2})-([0-9]{3}))?$/, t ? t('validation:zipCode') : {}),
    streetName: yup
      .string()
      .max(32)
      .trim(),
    buildingNumber: yup.string().max(32),
    status: yup
      .string()
      .required()
      .oneOf(['AVAILABLE', 'UNAVAILABLE']),
  });
