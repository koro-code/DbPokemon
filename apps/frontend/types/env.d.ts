declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      BACKEND_URL: string;
      FRONTEND_URL: string;
      STORAGE_SECRET: string;

      SPARQL_ENDPOINT: string;
    }
  }
}

export {};
