/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}

interface Window {
  storage: {
    get(key: string): Promise<{ value: string } | null>;
    set(key: string, value: string): Promise<void>;
  };
}
