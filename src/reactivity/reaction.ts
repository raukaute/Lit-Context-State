export type Dep = Set<ReactiveCallback>;
type KeyToDepMap = Map<unknown, Dep>;
const targetMap = new WeakMap<object, KeyToDepMap>();

// eslint-disable-next-line prefer-const
let shouldRecord = true;
let activeCallback: ReactiveCallback | undefined;

export class ReactiveCallback<T = unknown> {
  public fn: () => T;

  constructor(public _fn: () => T) {
    this.fn = _fn;
  }

  run() {
    try {
      activeCallback = this;
      startRecording();

      return this.fn();
    } finally {
      stopRecording();

      activeCallback = undefined;
    }
  }
}

export function reaction<T = unknown>(fn: () => T) {
  const _callback = new ReactiveCallback(fn);

  _callback.run();
}

export function recordReactiveCallback(target: object, type: string, key: unknown) {
  if (!isRecording()) {
    return;
  }

  let depsMap = targetMap.get(target);

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set<ReactiveCallback>() as Dep));
  }

  if (!dep.has(activeCallback!)) {
    dep.add(activeCallback!);
  }
}

export function triggerReactiveCallbacks(target: object, key: unknown) {
  const depsMap = targetMap.get(target);

  if (!depsMap) {
    return;
  }

  const deps: (Dep | undefined)[] = [];

  if (Array.isArray(target) && !Number.isNaN(key as number)) {
    deps.push(depsMap.get('length'));
  } else if (key !== undefined) {
    deps.push(depsMap.get(key));
  }

  const effects: ReactiveCallback[] = [];

  for (const dep of deps) {
    if (dep) {
      effects.push(...dep);
    }
  }

  for (const effect of effects) {
    if (effect !== activeCallback) {
      effect.run();
    }
  }
}

export function isRecording() {
  return shouldRecord && activeCallback !== undefined;
}

export function startRecording() {
  shouldRecord = true;
}

export function stopRecording() {
  shouldRecord = false;
}
