declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      BACKEND_URL: string;
      FRONTEND_URL: string;
      STORAGE_SECRET: string;

      OLLAMA_API_URL: string;
      OLLAMA_API_MODEL: string;
    }
  }
}

export {};
