import { baseHandler } from './proxy-handlers';

export function makeReactive<T extends object>(target: T): T;
export function makeReactive(target: Object) {
  return new Proxy(target, baseHandler);
}
