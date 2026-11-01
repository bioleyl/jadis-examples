import { css, Jadis } from '@jadis/core';

import { browserApi } from '../api';
import { jsonOf } from '../attributes';
import { ServingsScaler } from '../components/servings-scaler';
import { scaleIngredient } from '../scale';

import type { ActiveRoute, RoutedPage } from '@jadis/core';
import type { Api, LoadingPage } from '../types/api.types';
import type { RecipeView } from '../types/recipe.types';

const STATUS = { notFound: 404, ok: 200 } as const;

/**
 * One recipe: `/recipes/:slug`. The server answers 404 for a recipe that does not exist (`httpStatus`), and titles
 * the page after the recipe (`pageTitle`). Kept while the route stays on it (`onRoute`): another recipe loads in place.
 */
export class RecipePage extends Jadis implements RoutedPage, LoadingPage {
  static readonly selector = 'recipe-page';

  readonly data = this.useChange<RecipeView | null>(null, (data) => this.draw(data), {
    attribute: 'data',
    parse: jsonOf<RecipeView | null>(null),
  });

  private readonly _refs = this.useRefs((ref) => ({
    content: ref('.content'),
    ingredients: ref<HTMLUListElement>('.ingredients'),
    instructions: ref<HTMLOListElement>('.instructions'),
    missing: ref('.missing'),
    scaler: ref(ServingsScaler),
    title: ref('h1'),
  }));

  async load(route: ActiveRoute, api: Api): Promise<void> {
    const slug = route.params.slug ?? '';
    const recipe = await api.recipe(slug);
    this.data.set(recipe ? { found: true, recipe } : { found: false, slug });
  }

  onRoute(route: ActiveRoute): void {
    if (this.shownSlug() === route.params.slug) {
      return;
    }
    void this.load(route, browserApi);
  }

  httpStatus(): number {
    return this.data.get()?.found === false ? STATUS.notFound : STATUS.ok;
  }

  pageTitle(): string {
    const data = this.data.get();
    return data?.found ? data.recipe.title : 'No such recipe';
  }

  templateHtml(): Node {
    return (
      <>
        <a class="back" href="/">
          ← All recipes
        </a>
        <h1 />
        <p class="missing" hidden>
          There is no recipe of that name.
        </p>
        <div class="content">
          <ServingsScaler onChange={() => this.drawIngredients()} />
          <h2>Ingredients</h2>
          <ul class="ingredients" />
          <h2>Instructions</h2>
          <ol class="instructions" />
        </div>
      </>
    );
  }

  templateCss(): string {
    return css`
      :host {
        display: block;
      }
      .back {
        color: #b5502a;
        text-decoration: none;
      }
      li {
        margin: 0.4rem 0;
      }
      [hidden] {
        display: none;
      }
    `;
  }

  private shownSlug(): string | undefined {
    const data = this.data.get();
    return data?.found ? data.recipe.slug : data?.slug;
  }

  private draw(data: RecipeView | null): void {
    if (data === null) {
      return;
    }
    this._refs.missing.hidden = data.found;
    this._refs.content.hidden = !data.found;
    if (!data.found) {
      this._refs.title.textContent = 'No such recipe';
      return;
    }
    this._refs.title.textContent = data.recipe.title;
    this._refs.scaler.value.set(data.recipe.servings);
    this._refs.instructions.replaceChildren(...data.recipe.instructions.map((step) => <li>{step}</li>));
    this.drawIngredients();
  }

  private drawIngredients(): void {
    const data = this.data.get();
    if (!data?.found) {
      return;
    }
    const factor = this._refs.scaler.value.get() / data.recipe.servings;
    this._refs.ingredients.replaceChildren(
      ...data.recipe.ingredients.map((ingredient) => <li>{scaleIngredient(ingredient, factor)}</li>)
    );
  }
}

RecipePage.register();
