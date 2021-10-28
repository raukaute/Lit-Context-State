/* eslint-disable no-debugger */
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import state from './context/mockState';
import { observe } from './context/reactivity/observe';
// import { ModelController } from './context';

@customElement('my-element')
export class MyElement extends LitElement {
  // private modelMatrix = new ModelController(this);

  // private items = state.testArray;

  override connectedCallback() {
    super.connectedCallback();

    observe(() => {
      console.log('effect Array');
      state.testArray.map((x) => console.log(x));
    });

    observe(() => {
      console.log('effect String');
      console.log(state.tester);
    });
  }

  private changeState = () => {
    state.testArray = [...state.testArray];

    state.tester = 'Somebody else';

    this.requestUpdate();
  };

  override render() {
    return html`
      <div>${state.testArray.map((x) => x)}</div>
      <button @click=${this.changeState}>Click me</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
