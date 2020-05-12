import { EmailFormSchema } from '@dnb/common';
import { IFieldResolver } from 'graphql-tools';
import i18n from 'i18next';
import { Token } from '../../../../enums/token';
import User from '../../../../models/userModel';
import MailService from '../../../../services/MailService/MailService';
import JWTUtil from '../../../../utils/JWTUtil/JWTUtil';
import { Context } from '../../../context';

interface RequestPasswordResetArgs {
  requestPasswordResetInput: {
    email: string;
  };
}

export const requestPasswordReset: IFieldResolver<
  undefined,
  Context,
  RequestPasswordResetArgs
> = async (_, { requestPasswordResetInput }) => {
  EmailFormSchema().validateSync(requestPasswordResetInput);

  const { email } = requestPasswordResetInput;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new Error('User does not exist.');
  }

  const { _id, email: existingUserEmail } = existingUser;

  const token = JWTUtil.signToken(
    {
      userId: _id,
      type: Token.RESET_PASSWORD,
    },
    '1h'
  );

  await MailService.sendEmail({
    receivers: [existingUserEmail],
    subject: i18n.t('emails:reset_email_subject'),
    text: generateResetPasswordText(token),
  });

  await existingUser.set('resetPasswordToken', token).save();

  console.log('WTF');

  return true;
};

const generateResetPasswordText = (token: string) => {
  const url = `${process.env.FRONTEND_URL}/forgot-password/${token}`;

  return i18n.t('emails:reset_email_text', {
    url,
    interpolation: {
      escapeValue: false,
    },
  });
};
