import { Analytics } from '@/types';

export function validateAnalyticsObject(obj: any): obj is Analytics {
  const isObject = typeof obj === 'object' && obj !== null;
  const hasId = 'id' in obj;
  const hasData = 'data' in obj;
  const hasEvent = 'event' in obj;
  let hasType = false,
    hasTimestamp = false;
  if (hasEvent) {
    hasType = 'type' in obj?.event;
    hasTimestamp = 'timestamp' in obj?.event;
  }
  return Boolean(isObject && hasId && hasData && hasEvent && hasType && hasTimestamp);
}

export function validateReadOptionObject(obj: any): obj is { key: string; value: any; multiple?: boolean } {
  const hasKey = 'key' in obj;
  const hasValue = 'value' in obj;
  return Boolean(hasKey && hasValue);
}
