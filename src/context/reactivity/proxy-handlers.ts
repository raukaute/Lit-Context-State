import { makeReactive } from './makeReactive';
import { recordReactiveCallback, triggerReactiveCallbacks } from './observe';

export const hasChanged = (value: unknown, oldValue: unknown): boolean =>
  !Object.is(value, oldValue);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object';

export const baseHandler: object = {
  get: function (target: object, key: string | symbol, receiver: Object) {
    const res = Reflect.get(target, key, receiver);

    recordReactiveCallback(target, 'get', key);

    if (isObject(res)) {
      return makeReactive(res);
    }

    return res;
  },

  set: function (
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ) {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log(target, key, value);
    const oldValue = (target as { [key: string | symbol]: unknown })[key];

    if (Array.isArray(target)) {
      console.log(target);
      console.log(Number(key) < target.length);
    }

    const result = Reflect.set(target, key, value, receiver);

    if (Array.isArray(target) && Number(key) > target.length) {
      triggerReactiveCallbacks(target, 'set', key, value);
    } else if (hasChanged(value, oldValue)) {
      triggerReactiveCallbacks(target, 'set', key, value, oldValue);
    }

    return result;
  },
};
