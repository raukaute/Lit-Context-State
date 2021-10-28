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

    console.log(key);
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
    const oldValue = (target as { [key: string | symbol]: unknown })[key];

    const result = Reflect.set(target, key, value, receiver);

    if (hasChanged(value, oldValue)) {
      triggerReactiveCallbacks(target, 'set', key, value, oldValue);
    }

    return result;
  },
};
