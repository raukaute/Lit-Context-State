import { stateDirective } from './state-directive';
import { DirectiveResult } from 'lit/directive.js';
import { notEqual, property } from 'lit';
import type { ReactiveController, ReactiveControllerHost } from 'lit';

import state from './mockState';

export type ModelCode = 'AD' | 'HE';

class ModelController implements ReactiveController {
  host: ReactiveControllerHost;

  private modelCode: ModelCode = 'AD';

  private models: unknown[];

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);

    this.models = state.application.modelMatrix.models;
  }

  hostConnected() {
    console.log('Horst connected');

    setTimeout(() => this.addModel('Ohne Button'), 1000);
  }

  hostDisconnected() {
    console.log('Horst disconnected');
  }

  renderModels(...values: unknown[]): DirectiveResult {
    return stateDirective(this.models);
  }

  public addModel(model: string) {
    this.models.push(model);
  }

  public setModelCode(code: ModelCode): void {
    const hasChanged = notEqual(code, this.modelCode);

    this.modelCode = code;
    hasChanged && this.host.requestUpdate();
  }
}

export { ModelController, ModelController as default };
