import { css, Jadis } from '@jadis/core';

const MIN_SERVINGS = 1;

/**
 * How many servings to cook: − and + buttons around the number. It is drawn on the server like any component, and
 * works once its definition has loaded in the browser.
 */
export class ServingsScaler extends Jadis {
  static readonly selector = 'servings-scaler';

  readonly value = this.useChange(MIN_SERVINGS, (value) => this.draw(value), { attribute: 'value' });
  readonly events = this.useEvents<{ change: number }>();

  private readonly _refs = this.useRefs((ref) => ({
    fewer: ref<HTMLButtonElement>('.fewer'),
    more: ref<HTMLButtonElement>('.more'),
    value: ref('.value'),
  }));

  onConnect(): void {
    this.on(this._refs.fewer, 'click', () => this.change(-1));
    this.on(this._refs.more, 'click', () => this.change(1));
  }

  templateHtml(): Node {
    return (
      <div class="scaler" role="group" aria-label="Servings">
        <button type="button" class="fewer" aria-label="Fewer servings">
          −
        </button>
        <span class="value" aria-live="polite" />
        <button type="button" class="more" aria-label="More servings">
          +
        </button>
      </div>
    );
  }

  templateCss(): string {
    return css`
      :host {
        display: inline-block;
      }
      .scaler {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
      }
      button {
        width: 2rem;
        height: 2rem;
        border: 1px solid #c9bfae;
        border-radius: 50%;
        background: #fff;
        font: inherit;
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.4;
        cursor: default;
      }
      .value {
        min-width: 6.5rem;
        text-align: center;
      }
    `;
  }

  private change(step: number): void {
    this.value.set((value) => Math.max(MIN_SERVINGS, value + step));
    this.events.emit('change', this.value.get());
  }

  private draw(value: number): void {
    this._refs.value.textContent = `${value} serving${value === 1 ? '' : 's'}`;
    this._refs.fewer.disabled = value <= MIN_SERVINGS;
  }
}

ServingsScaler.register();
