import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import AuthService from '../services/AuthService/AuthService';
import e from 'express';
import { AuthTokenData } from './utils';
import { IUser } from '../models/userModel';
import i18n from 'i18next';

export interface Context {
  res: e.Response;
  req: e.Request;
  accessToken: AuthTokenData | null;
  refreshToken: string | null;
  user: IUser | null;
  language: string;
}

export const expressContext = async ({ req, res }: ExpressContext) => {
  let context: Context = {
    res,
    req,
    accessToken: null,
    refreshToken: null,
    user: null,
    language: 'en',
  };

  const languageHeader = req.get('accept-language');

  let language = 'en';
  try {
    language = languageHeader!.split(';')[0].split(',')[0];
  } catch (e) {
    console.error(e);
  }

  i18n.changeLanguage(language);

  context = {
    ...context,
    ...(await AuthService.getAuthContextData(req)),
    language,
  };

  return context;
};
