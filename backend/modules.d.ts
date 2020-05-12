declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'staging' | 'production';
    PORT: number;

    MONGO_USER: string;
    MONGO_PASSWORD: string;
    MONGO_URL: string;
    MONGO_DB_NAME: string;

    JWT_KEY: string;

    APOLLO_KEY: string;
    APOLLO_GRAPH_VARIANT: string;

    FRONTEND_URL: string;

    MAILER_USER: string;
    MAILER_PASSWORD: string;
  }
}
