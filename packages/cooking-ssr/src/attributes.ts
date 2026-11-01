import type { AttributeParser } from '@jadis/core';

/**
 * Reads an attribute holding JSON: a page's data, written in the server's markup (`data='{"recipes":[…]}'`) so that
 * the page upgrades in the browser with it. Absent or unreadable gives the fallback.
 */
export const jsonOf =
  <Value>(fallback: Value): AttributeParser<Value> =>
  (value) => {
    if (value === null) {
      return fallback;
    }
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  };
