import { css, Jadis } from '@jadis/core';

import { browserApi } from '../api';
import { jsonOf } from '../attributes';
import { navigation } from '../navigation';

import type { ActiveRoute, RoutedPage } from '@jadis/core';
import type { Api, LoadingPage } from '../types/api.types';
import type { RecipesView } from '../types/recipe.types';

const QUERY = 'q';

const queryOf = (route: ActiveRoute): string => route.query.get(QUERY) ?? '';

/**
 * The recipes, and a search over them (`/?q=pasta`). The search form works without JavaScript: the browser asks the
 * server for `/?q=…`, which renders the results. With it, the router shows the same page with the new query, and the
 * page loads the results in place.
 */
export class RecipesPage extends Jadis implements RoutedPage, LoadingPage {
  static readonly selector = 'recipes-page';

  /** The recipes shown, bound to the `data` attribute: the server writes it, the page upgrades with it. */
  readonly data = this.useChange<RecipesView | null>(null, (data) => this.draw(data), {
    attribute: 'data',
    parse: jsonOf<RecipesView | null>(null),
  });

  private readonly _refs = this.useRefs((ref) => ({
    count: ref('.count'),
    list: ref<HTMLUListElement>('.list'),
    search: ref<HTMLInputElement>('input'),
  }));

  async load(route: ActiveRoute, api: Api): Promise<void> {
    const query = queryOf(route);
    this.data.set({ query, recipes: await api.recipes(query) });
  }

  onRoute(route: ActiveRoute): void {
    // The server's data, or a query already shown: nothing to load.
    if (this.data.get()?.query === queryOf(route)) {
      return;
    }
    void this.load(route, browserApi);
  }

  templateHtml(): Node {
    return (
      <>
        <h1>Recipes</h1>
        <form class="search" method="get" action="/" role="search" onSubmit={(event) => this.search(event)}>
          <input type="search" name={QUERY} placeholder="Search by recipe name" aria-label="Search recipes" />
          <button type="submit">Search</button>
        </form>
        <p class="count" />
        <ul class="list" />
      </>
    );
  }

  templateCss(): string {
    return css`
      :host {
        display: block;
      }
      .search {
        display: flex;
        gap: 0.5rem;
      }
      input {
        flex: 1;
        padding: 0.5rem 0.75rem;
        border: 1px solid #c9bfae;
        border-radius: 6px;
        font: inherit;
      }
      button {
        padding: 0.5rem 1rem;
        border: 0;
        border-radius: 6px;
        background: #b5502a;
        color: #fff;
        font: inherit;
        cursor: pointer;
      }
      .count {
        color: #7a6f5d;
      }
      .list {
        display: grid;
        gap: 0.5rem;
        padding: 0;
        list-style: none;
      }
      .list a {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        border: 1px solid #e7e1d6;
        border-radius: 8px;
        background: #fff;
        color: inherit;
        text-decoration: none;
      }
      .list a:hover {
        border-color: #b5502a;
      }
      .serves {
        color: #7a6f5d;
      }
    `;
  }

  private search(event: Event): void {
    event.preventDefault();
    const query = this._refs.search.value.trim();
    navigation.goto(query === '' ? '/' : `/?${QUERY}=${encodeURIComponent(query)}`);
  }

  private draw(data: RecipesView | null): void {
    if (data === null) {
      return;
    }
    // A value set in code: the server writes it in the markup as the field's `value` attribute.
    this._refs.search.value = data.query;
    const found = data.recipes.length;
    this._refs.count.textContent = data.query === '' ? `${found} recipes` : `${found} found for “${data.query}”`;
    this._refs.list.replaceChildren(
      ...data.recipes.map((recipe) => (
        <li>
          <a href={`/recipes/${recipe.slug}`}>
            <span>{recipe.title}</span>
            <span class="serves">serves {recipe.servings}</span>
          </a>
        </li>
      ))
    );
  }
}

RecipesPage.register();
