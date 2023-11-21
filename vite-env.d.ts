/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REACT_APP_AUTH_TOKEN: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }