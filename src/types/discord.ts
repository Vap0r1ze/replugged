export type ModuleExports = Record<string, unknown> | ((...args: unknown[]) => unknown) | string;

export interface RawModule {
  id: number;
  loaded: boolean;
  exports: ModuleExports;
}

export type WebpackRequireCache = Record<string | number, RawModule>;

export type WebpackRequire = ((e: number) => ModuleExports) & {
  c: WebpackRequireCache;
};

export type WebpackChunk = [
  (symbol | number)[],
  Record<number, (
    wpModule: { exports: ModuleExports },
    wpExports: typeof wpModule.exports,
    wpRequire: WebpackRequire
  ) => void>,
  ((r: WebpackRequire) => unknown)?
];

export type WebpackChunkGlobal = WebpackChunk[] & {
  push: (chunk: WebpackChunk) => unknown;
};

export interface CommandOptions {
  type: number;
  name: string;
  displayName?: string;
  description: string;
  displayDescription?: string;
  required?: boolean;
  choices?: {
    name: string;
    values: string | number;
  }[];
  options?: CommandOptions[];
  channel_types?: number[];
  min_value?: number;
  max_value?: number;
  autocomplete?: boolean;
}
