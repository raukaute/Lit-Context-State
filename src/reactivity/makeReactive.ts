import { baseHandler } from './proxy-handlers.js';

export function makeReactive<T extends object>(target: T): T;
export function makeReactive(target: Object) {
  // Check if already is reactive in case this is coming in from a setter invoked getter
  return new Proxy(target, baseHandler);
}
