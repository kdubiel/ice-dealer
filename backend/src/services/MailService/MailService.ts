import nodemailer from 'nodemailer';

interface EmailProps {
  receivers: string[];
  subject: string;
  text: string;
}

export default class MailService {
  private static createTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  public static sendEmail(emailProps: EmailProps) {
    const { receivers, subject, text } = emailProps;

    return this.createTransporter().sendMail({
      from: process.env.MAILER_USER,
      to: receivers.join(','),
      subject,
      text,
    });
  }
}
