export function optional<T = any>(fn: () => T) {
  let data: T | null = null;
  let error: Error | null = null;
  try {
    data = fn();
  } catch (e) {
    data = null;
    error = e as Error;
  } finally {
    return {
      status: error ? 'failed' : 'ok',
      data,
      error
    };
  }
}

export async function optionalAsync<T = any>(fn: () => Promise<T>) {
  let data: T | null = null;
  let error: Error | null = null;
  try {
    data = await fn();
  } catch (e) {
    data = null;
    error = e as Error;
  } finally {
    return {
      status: error ? 'failed' : 'ok',
      data,
      error
    };
  }
}
