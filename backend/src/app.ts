import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import { createServer } from 'https';
import mongoose from 'mongoose';
import { AuthDirective, directivesSchemas } from './graphql/directives';
import resolvers from './graphql/resolvers';
import schema from './graphql/schema';
import { expressContext } from './graphql/context';
import i18n from 'i18next';
import { initializeYupLocales, yup } from '@dnb/common';
import { pl_common, en_common } from './translations';

class App {
  private express: express.Application;
  private apollo: ApolloServer;

  constructor() {
    this.express = express();
    this.apollo = this.initializeApolloServer();

    this.initializeInternationalization();
    this.connectToDatabase();
    this.initializeExpressMiddlewares();
    this.initializeApolloMiddlewares();
    this.connectApolloToExpress();
  }

  private initializeApolloServer() {
    return new ApolloServer({
      introspection: process.env.NODE_ENV === 'development',
      playground: process.env.NODE_ENV === 'development',
      resolvers,
      typeDefs: [...schema, directivesSchemas],
      schemaDirectives: {
        auth: AuthDirective,
      },
      context: expressContext,
    });
  }

  private initializeExpressMiddlewares() {
    this.express.use(cookieParser());
    this.express.use(helmet());
  }

  private initializeInternationalization() {
    i18n.init({
      fallbackLng: 'en',
      lng: 'en',
      preload: ['en', 'pl'],
      debug: false,
      resources: {
        en: {
          ...en_common,
          yup: yup.en,
        },
        pl: {
          ...pl_common,
          yup: yup.pl,
        },
      },
    });

    initializeYupLocales(i18n);
  }

  private initializeApolloMiddlewares() {}

  private connectToDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_URL,
      MONGO_DB_NAME,
    } = process.env;
    mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }

  private connectApolloToExpress() {
    this.apollo.applyMiddleware({
      app: this.express,
      path: '/graphql',
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'OPTIONS'],
      },
    });
  }

  private getServerInstance() {
    const isDev = process.env.NODE_ENV === 'development';

    return isDev
      ? createServer(
          {
            key: fs.readFileSync(__dirname + '/ssl/key.pem'),
            cert: fs.readFileSync(__dirname + '/ssl/cert.pem'),
            passphrase: 'abcef',
          },
          this.express
        )
      : this.express;
  }

  public listen() {
    this.getServerInstance().listen(process.env.PORT, () => {
      console.log('Listening...');
    });
  }
}

export default App;
