interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_CLIENT_ID: string;
  readonly VITE_API_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
