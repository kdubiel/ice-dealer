import * as yup from 'yup';

export const loginSchema = () =>
  yup.object({
    login: yup
      .string()
      .min(6)
      .max(320)
      .required(),
    password: yup
      .string()
      .min(8)
      .max(64)
      .required()
  });
