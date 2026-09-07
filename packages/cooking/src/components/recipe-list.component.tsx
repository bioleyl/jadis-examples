import { css, Jadis } from '@jadis/core';

import { RecipeService } from '../services/recipe.service';
import { RecipeSearchComponent } from './recipe-search.component';

import type { Recipe } from '../types/recipe.type';

export class RecipeList extends Jadis {
  static readonly selector = 'recipe-list';

  private readonly _refs = this.useRefs((ref) => ({
    listElement: ref<HTMLUListElement>('ul'),
    searchElement: ref<RecipeSearchComponent>('recipe-search'),
  }));

  readonly events = this.useEvents<{
    selected: number;
  }>();

  templateCss(): string {
    return css`
      ul:empty::before {
        content: 'No results';
        display: block;
        color: #666;
        font-style: italic;
        padding: 8px;
      }
      ul {
        padding: 0;
        margin: 1rem 0;
        list-style: none;
      }
      li {
        padding: 8px 12px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        text-align: left;
      }
      li:hover,
      li:focus-visible {
        background-color: #f0f0f0;
      }
      li:focus-visible {
        outline: 2px solid #007bff;
        outline-offset: -2px;
      }
    `;
  }

  templateHtml(): Node {
    return (
      <>
        <RecipeSearchComponent />
        <ul aria-live="polite" />
      </>
    );
  }

  onConnect(): void {
    this.on(this._refs.listElement, 'click', (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const listItem = event.target.closest<HTMLLIElement>('li[data-recipe-id]');
      if (!listItem || !this._refs.listElement.contains(listItem)) {
        return;
      }

      const recipeId = Number(listItem.dataset.recipeId);
      if (Number.isInteger(recipeId)) {
        this.events.emit('selected', recipeId);
      }
    });
    this.on(this._refs.listElement, 'keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      if (!(event.target instanceof HTMLLIElement)) {
        return;
      }

      event.preventDefault();
      event.target.click();
    });
    this._refs.searchElement.events.register('search', this.onSearchInput.bind(this));
    this.buildList(RecipeService.getInstance().all);
  }

  private onSearchInput(query: string): void {
    this.buildList(RecipeService.getInstance().search(query));
  }

  private buildList(recipes: Array<Recipe>): void {
    this._refs.listElement.replaceChildren(...recipes.map((recipe) => this.buildListItem(recipe)));
  }

  private buildListItem(recipe: Recipe): HTMLLIElement {
    return (
      <li data-recipe-id={recipe.id} role="button" tabIndex={0}>
        {recipe.title}
      </li>
    );
  }
}

RecipeList.register();
