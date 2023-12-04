import { Option } from '@/types';

export function optional<T = any>(fn: () => T): Option<T> {
  let data: T | null = null;
  let error: Error | undefined = undefined;
  try {
    data = fn();
  } catch (e) {
    data = null;
    error = e as Error;
  } finally {
    return {
      status: error ? 'fail' : 'ok',
      data,
      error
    };
  }
}

export async function optionalAsync<T = any>(fn: () => Promise<T>): Promise<Option<T>> {
  let data: T | null = null;
  let error: Error | undefined = undefined;
  try {
    data = await fn();
  } catch (e) {
    data = null;
    error = e as Error;
  } finally {
    return {
      status: error ? 'fail' : 'ok',
      data,
      error
    };
  }
}
