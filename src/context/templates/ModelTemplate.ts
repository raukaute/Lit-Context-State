import { html } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card } from '../../views/card/card.view';
import { Model } from '../../types/state.js';

const modelTemplate = (what: any) => html`<div>${what}</div>`;

export { modelTemplate, modelTemplate as default };
