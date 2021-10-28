import { noChange, html } from 'lit';
import { directive, PartInfo, Directive } from 'lit/directive.js';
import { AsyncDirective } from 'lit/async-directive.js';

import { effect } from '@vue/reactivity/dist/reactivity.esm-browser';

class StateDirective extends AsyncDirective {
  override update(part: PartInfo, [state]: [state: unknown[]]) {
    effect(() => {
      this.setValue(html`${state.map((model) => html`<div>${model}</div>`)}`);
    });

    return noChange;
  }

  render(data, filter) {}
}

export const stateDirective = directive(StateDirective);
