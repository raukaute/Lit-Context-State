import { noChange, TemplateResult } from 'lit';
import { directive, DirectiveParameters, DirectiveResult } from 'lit/directive.js';
import { AsyncDirective } from 'lit/async-directive.js';
import { reaction } from '../reactivity/reaction.js';
import type { Model } from '../types/state.js';

export interface ModelTemplateConfig {
  template: (model: Model) => TemplateResult<1>;
  filter?: (x: any) => boolean;
}

class ModelTemplateFactory extends AsyncDirective {
  protected _models: Model[];
  protected _filter = (x: any) => !!x;
  protected _template: ModelTemplateConfig['template'];

  render(models: Model[], config: ModelTemplateConfig) {
    this._models = models;

    this._template = config.template;

    if (config && config.filter) {
      this._filter = config.filter;
    }
    // does this need a guard?
    reaction(() => this.reactToStateChange());

    return noChange;
  }

  private reactToStateChange() {
    const template = this._models.filter(this._filter).map(this._template);
    return this.setValue(template);
  }
}

export const modelTemplateFactory: (
  ...args: DirectiveParameters<ModelTemplateFactory>
) => DirectiveResult<typeof ModelTemplateFactory> = directive(ModelTemplateFactory);
