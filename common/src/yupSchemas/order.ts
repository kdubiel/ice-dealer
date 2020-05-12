import * as yup from 'yup';
import { TFunction } from 'i18next';

export const CreateOrderValidationSchema = () =>
  yup.object({
    amount: yup
      .number()
      .max(999999)
      .min(5)
      .required(),
    pickupLocation: yup.string().required(),
  });

export const OrderStatusValidationSchema = () =>
  yup.object({
    status: yup
      .string()
      .required()
      .oneOf(['AWAITING', 'PROCESSING', 'DELIVERED', 'CLOSED', 'CANCELED']),
  });
