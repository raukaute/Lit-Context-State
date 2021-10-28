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
      state.testArray.map((x) => console.log(x));

      console.log('Yeah');
      this.requestUpdate();
    });
  }

  private changeState = () => {
    console.log(state.testArray);
    state.testArray.push('Yeah');
    console.log(state.testArray);
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
