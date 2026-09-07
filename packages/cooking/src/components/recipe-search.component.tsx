import { css, Jadis } from '@jadis/core';

export class RecipeSearchComponent extends Jadis {
  static readonly selector = 'recipe-search';

  private readonly _refs = this.useRefs((ref) => ({
    searchInput: ref<HTMLInputElement>('#search'),
  }));

  readonly events = this.useEvents<{ search: string }>();

  templateCss(): string {
    return css`
      label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5rem;
        text-align: left;
      }
      input {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 8px;
        width: 100%;
        box-sizing: border-box;
        font: inherit;
      }
    `;
  }

  templateHtml(): Node {
    return (
      <>
        <label htmlFor="search">Search recipes</label>
        <input type="search" id="search" placeholder="Search by recipe name" autocomplete="off" />
      </>
    );
  }

  onConnect(): void {
    this.on(this._refs.searchInput, 'input', () => this.events.emit('search', this._refs.searchInput.value));
  }
}

RecipeSearchComponent.register();
