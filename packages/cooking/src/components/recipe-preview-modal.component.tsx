import { css, Jadis } from '@jadis/core';

import type { Recipe } from '../types/recipe.type';

export class RecipePreviewModal extends Jadis {
  static readonly selector = 'recipe-preview-modal';
  private _recipeId = -1;

  private readonly _refs = this.useRefs((ref) => ({
    closeButton: ref<HTMLButtonElement>('.close-button'),
    modal: ref('.modal'),
    modalContent: ref('.modal-content'),
    recipeIngredients: ref<HTMLUListElement>('.recipe-ingredients'),
    recipeTitle: ref<HTMLHeadingElement>('.recipe-title'),
    showButton: ref<HTMLButtonElement>('.show-button'),
  }));

  readonly events = this.useEvents<{ show: number }>();

  templateCss(): string {
    return css`
      .modal {
        position: fixed;
        inset: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.5);
      }
      .modal-content {
        background-color: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        width: min(80%, 600px);
        max-height: min(80vh, 600px);
        overflow: auto;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: left;
      }
      .modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
      }
      .recipe-title {
        margin-top: 0;
      }
      .close-button {
        padding: 0.25rem 0.5rem;
        background: transparent;
        color: #555;
        font-size: 1.5rem;
        line-height: 1;
      }
      button {
        border: none;
        border-radius: 4px;
        padding: 0.65rem 1rem;
        cursor: pointer;
        font: inherit;
      }
      .show-button {
        background-color: #007bff;
        color: #fff;
      }
      button:focus-visible {
        outline: 2px solid #0056b3;
        outline-offset: 2px;
      }
    `;
  }

  templateHtml(): Node {
    return (
      <div class="modal" role="presentation">
        <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="preview-title">
          <div class="modal-header">
            <h2 class="recipe-title" id="preview-title" />
            <button type="button" class="close-button" aria-label="Close preview">
              ×
            </button>
          </div>
          <h3>Ingredients</h3>
          <ul class="recipe-ingredients" />
          <button type="button" class="show-button">
            View full recipe
          </button>
        </div>
      </div>
    );
  }

  onConnect(): void {
    this.hidden = true;
    this.on(this._refs.showButton, 'click', () => this.events.emit('show', this._recipeId));
    this.on(this._refs.closeButton, 'click', () => this.hide());
    this.on(this._refs.modal, 'click', () => this.hide());
    this.on(this._refs.modalContent, 'click', (event) => event.stopPropagation());
  }

  show(recipe: Recipe): void {
    this._recipeId = recipe.id;
    this._refs.recipeTitle.textContent = recipe.title;
    this._refs.recipeIngredients.replaceChildren(
      ...recipe.ingredients.map((ingredient) => <li>{ingredient}</li>)
    );
    this.hidden = false;
  }

  hide(): void {
    this.hidden = true;
  }
}

RecipePreviewModal.register();
