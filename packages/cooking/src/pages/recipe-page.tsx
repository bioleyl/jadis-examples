import { css, Jadis } from '@jadis/core';

import { assert } from '../helpers/assert.helper';
import { myRouter } from '../router';
import { RecipeService } from '../services/recipe.service';

import type { Recipe } from '../types/recipe.type';

export class RecipePage extends Jadis {
  static readonly selector = 'cooking-recipe-page';

  private readonly _recipe = this.useChange<Recipe | null>(null, (recipe) => {
    if (!recipe) {
      return;
    }

    this._refs.titleElement.textContent = recipe.title;
    this._refs.ingredients.replaceChildren(...recipe.ingredients.map((ingredient) => <li>{ingredient}</li>));
    this._refs.instructions.replaceChildren(...recipe.instructions.map((instruction) => <li>{instruction}</li>));
  });

  private readonly _refs = this.useRefs((ref) => ({
    backButton: ref<HTMLButtonElement>('.back-button'),
    ingredients: ref<HTMLUListElement>('.ingredients'),
    instructions: ref<HTMLOListElement>('.instructions'),
    titleElement: ref<HTMLHeadingElement>('.title'),
  }));

  templateCss(): string {
    return css`
      :host {
        display: block;
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
      }
      .back-button {
        margin-bottom: 1.5rem;
        border: 1px solid #007bff;
        border-radius: 4px;
        padding: 0.5rem 0.75rem;
        background: #fff;
        color: #007bff;
        cursor: pointer;
        font: inherit;
      }
      .back-button:hover {
        background: #007bff;
        color: #fff;
      }
      .title {
        margin-top: 0;
      }
      .section {
        margin-top: 2rem;
      }
      li {
        margin: 0.75rem 0;
        line-height: 1.5;
      }
      button:focus-visible {
        outline: 2px solid #0056b3;
        outline-offset: 2px;
      }
    `;
  }

  templateHtml(): Node {
    return (
      <>
        <button type="button" class="back-button">
          ← Back to recipes
        </button>
        <h1 class="title" />
        <section class="section">
          <h2>Ingredients</h2>
          <ul class="ingredients" />
        </section>
        <section class="section">
          <h2>Instructions</h2>
          <ol class="instructions" />
        </section>
      </>
    );
  }

  onConnect(): void {
    this.on(this._refs.backButton, 'click', () => myRouter.goto('main'));

    const rawRecipeId = this.getAttribute('id');
    const recipeId = Number(rawRecipeId);
    assert(rawRecipeId !== null && Number.isInteger(recipeId), 'A valid recipe ID is required');
    this._recipe.set(RecipeService.getInstance().byId(recipeId));
  }
}

RecipePage.register();
