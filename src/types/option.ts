export type Option<D> = {
  status: 'ok' | 'fail';
  data: D | null;
  error?: Error | string;
};
