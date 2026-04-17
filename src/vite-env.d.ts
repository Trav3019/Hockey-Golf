/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EP_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
