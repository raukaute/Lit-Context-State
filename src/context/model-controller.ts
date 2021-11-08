import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { modelTemplateFactory } from './model-template-factory.js';
import { modelTemplate } from './templates/ModelTemplate.js';
import state from '../_states/index.js';

class ModelController implements ReactiveController {
  host: ReactiveControllerHost;

  private models = state.application.modelMatrix.models;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {}

  hostDisconnected() {}

  renderModels() {
    return modelTemplateFactory(this.models, { template: modelTemplate });
  }
}

export { ModelController, ModelController as default };
