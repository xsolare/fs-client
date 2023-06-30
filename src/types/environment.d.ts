declare const process: NodeJS.Process;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_HEADER?: string;
      VITE_API_URL?: string;
    }
  }
}

export {};
