/// <reference types="react-scripts" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_NODE_ENV: 'development' | 'production' | 'staging';
      REACT_APP_GQL_URI: string;
    }
  }
}

export {};
