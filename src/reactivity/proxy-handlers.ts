import { makeReactive } from './makeReactive.js';
import { recordReactiveCallback, triggerReactiveCallbacks } from './reaction.js';

export const hasChanged = (value: unknown, oldValue: unknown): boolean => !Object.is(value, oldValue);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object';

export const baseHandler: object = {
  get(target: object, key: string | symbol, receiver: Object) {
    recordReactiveCallback(target, 'get', key);

    const res = Reflect.get(target, key, receiver);
    if (isObject(res)) {
      return makeReactive(res);
    }

    return res;
  },

  set(target: object, key: string | symbol, value: unknown, receiver: object) {
    const oldValue = (target as { [key: string | symbol]: unknown })[key];

    const result = Reflect.set(target, key, value, receiver);

    if ((Array.isArray(target) && Number(key) > target.length) || hasChanged(oldValue, value)) {
      triggerReactiveCallbacks(target, key);
    }

    return result;
  },
};
