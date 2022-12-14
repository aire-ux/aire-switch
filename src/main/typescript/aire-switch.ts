import {
  css,
  // customElement,
  html,
  LitElement,
  // property,
  PropertyValues,
  // query,
  TemplateResult
} from "lit";

import {
  query
} from 'lit/decorators/query.js';

import {
  property,
} from 'lit/decorators/property.js';
import {
  customElement
} from 'lit/decorators/custom-element.js';

@customElement('aire-switch')
export class Switch extends LitElement {
  static styles = css`
    .aire-switch {
      display: flex;
      align-items: center;
      gap: 2ch;
      justify-content: space-between;
      --thumb-size: 1.5rem;
      --thumb: hsl(0 0% 100%);
      --thumb-highlight: hsl(0 0% 0% / 25%);

      --track-size: calc(var(--thumb-size) * 2);
      --track-padding: 2px;
      --track-inactive: hsl(80 0% 80%);
      --track-active: var(--lumo-primary-color);

      --thumb-color: var(--thumb);
      --thumb-color-highlight: var(--thumb-highlight);
      --track-color-inactive: var(--track-inactive);
      --track-color-active: var(--track-active);
      --thumb-position: 0%;

      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      --isLTR: 1;
    }

    .aire-switch:dir(rtl) {
      --isLTR: -1;
    }

    .aire-switch > input {
      appearance: none;
      inline-size: var(--track-size);
      block-size: var(--thumb-size);
      padding: var(--track-padding);
      flex-shrink: 0;
      display: grid;
      align-items: center;
      grid: [track] 1fr / [track] 1fr;


      border: none;
      outline-offset: 5px;
      box-sizing: content-box;
      background: var(--track-color-inactive);
      border-radius: var(--track-size);
    }

    .aire-switch > input::before {
      content: "";
      grid-area: track;
      inline-size: var(--thumb-size);
      block-size: var(--thumb-size);
      background: var(--thumb-color);
      border-radius: 50%;
      box-shadow: 0 0 0 var(--highlight-size) var(--thumb-color-highlight);
      transform: translateX(var(--thumb-position));

    }

    .aire-switch > input:checked {
      --thumb-position: calc((var(--track-size) - 100%) * var(--isLTR));
      background: var(--track-color-active);
      --thumb-position: calc((var(--track-size) - 100%) * var(--isLTR));
    }
    
    .aire-switch > input:disabled {
      cursor: not-allowed;
      --thumb-color: transparent;
    }
    
    .aire-switch > input:disabled::before {
      
      cursor: not-allowed;
      box-shadow: inset 0 0 0 2px hsl(0, 0%, 100% / 50%);

    }


    .aire-switch > input:indeterminate {
    
        --thumb-position: calc(
          calc(
            calc(var(--track-size) / 2) - calc(var(--thumb-size) / 2)
          ) * var(--isLTR)
        );
    }

    @media (--motionOK) {
      .aire-switch > input::before {
        transition: transform var(--thumb-transition-duration) ease, box-shadow 0.25s ease;
      }
    }
    
    
    @media (prefers-color-scheme: dark) {
      .gui-switch > input:disabled::before {
        box-shadow: inset 0 0 0 2px hsl(0, 0%, 0% / 50%);
      }
    }
    
    .aire-switch > input:not(:disabled):hover::before {
      --highlight-size: .5rem;
    }

    .aire-switch.vertical {
      min-block-size: calc(var(--track-size) + calc(var(--track-padding) * 2));


    }

    .aire-switch.vertical > input {
      transform: rotate(calc(90deg * var(--isLTR) * -1));
    }
  `


  @property({
    attribute: true,
    type: String,
    reflect: true
  })
  private mode: Mode | undefined;


  @property({
    attribute: true,
    reflect: true,
    type: String
  })
  private direction: Direction | undefined;


  @query('input[type=checkbox]')
  private input: HTMLInputElement | undefined;

  constructor() {
    super();
    this.mode = 'on';
  }


  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    const input = this.input;
    if (changedProperties.has('mode')) {
      const mode = this.mode;
      if (input) {
        if (mode === 'off') {
          input.checked = false;
        }
        if (mode === 'indeterminate') {
          input.indeterminate = true;
        }
        if (mode === 'on') {
          input.checked = true;
        }
      }
    }
  }


  connectedCallback() {
    super.connectedCallback();
    this.input?.addEventListener('change', this.onInputChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.input?.removeEventListener('change', this.onInputChanged);
  }


  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.input?.addEventListener('change', this.onInputChanged);
  }


  readonly onInputChanged = (e: Event) => {
    const input = this.input;
    console.log("input changed", this.input?.checked);
    this.dispatchEvent(new CustomEvent('switch-value-changed', {
      detail: {
        selected: input?.checked
      }
    }));

  }

  render(): TemplateResult {
    return html`
      <label class="aire-switch" part="label">
        <slot></slot>
        <input type="checkbox" role="switch"/>
      </label>
    `
  }


}

export type Mode = 'on' | 'off' | 'indeterminate';
// export enum Mode {
//   On = 'on',
//   Off = 'off',
//   Indeterminate = 'indeterminate'
// }

export type Direction = 'horizontal' | 'vertical';
// export enum Direction {
//   Vertical = 'vertical',
//   Horizontal = 'horizontal'
// }