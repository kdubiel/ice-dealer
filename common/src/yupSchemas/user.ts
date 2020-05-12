import * as yup from 'yup';
import { TFunction } from 'i18next';

export const ChangePasswordSchema = (t: TFunction) => {
  yup
    .object()
    .shape({
      current_password: yup
        .string()
        .trim()
        .min(8)
        .max(64),
    })
    .concat(PasswordValidationSchema(t, true));
};

export const BaseUserFormSchema = () =>
  yup
    .object()
    .shape({
      name: yup
        .string()
        .trim()
        .min(6)
        .max(24)
        .matches(/^[a-zA-Z0-9]+$/)
        .required(),
      phoneNumber: yup
        .string()
        .trim()
        .min(9)
        .max(9)
        .required()
        .matches(/^[1-9]{1}[0-9]{8}$/),
    })
    .concat(EmailFormSchema());

export const EmailFormSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .trim()
      .email()
      .min(6)
      .max(320)
      .required(),
  });

export const ExtendedUserFormSchema = () =>
  yup.object().shape({
    role: yup
      .string()
      .required()
      .oneOf(['CLIENT', 'ADMIN']),
    status: yup
      .string()
      .required()
      .oneOf(['NEW', 'CONFIRMED']),
  });

export const PasswordValidationSchema = (t: TFunction, isRequired?: boolean) =>
  yup.object().shape({
    password: yup
      .string()
      .trim()
      .min(8)
      .max(64)
      .test('required', t('yup:mixed:required'), function(value) {
        return isRequired ? !!value : true;
      }),
    confirm_password: yup
      .string()
      .test('password-match', t('errors:password_match'), function(value) {
        return this.parent.password === value;
      }),
  });
