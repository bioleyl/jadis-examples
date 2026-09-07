import { css, Jadis } from '@jadis/core';

import { RecipeList } from '../components/recipe-list.component';
import { RecipePreviewModal } from '../components/recipe-preview-modal.component';
import { myRouter } from '../router';
import { RecipeService } from '../services/recipe.service';

export class MainPage extends Jadis {
  static readonly selector = 'cooking-main-page';

  private readonly _refs = this.useRefs((ref) => ({
    recipeList: ref<RecipeList>('recipe-list'),
    recipePreviewModal: ref<RecipePreviewModal>('recipe-preview-modal'),
  }));

  templateCss(): string {
    return css`
      :host {
        display: block;
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
        text-align: center;
      }
      .title {
        margin: 0 0 0.5em;
        font-size: clamp(2rem, 5vw, 3rem);
      }
      .intro {
        margin: 0 auto 2rem;
        color: #555;
      }
    `;
  }

  templateHtml(): Node {
    return (
      <>
        <h1 class="title">🍽️ Cooking</h1>
        <p class="intro">Search the collection and choose a recipe to get started.</p>
        <RecipeList />
        <RecipePreviewModal />
      </>
    );
  }

  onConnect(): void {
    this._refs.recipeList.events.register('selected', this.onRecipeSelected.bind(this));
    this._refs.recipePreviewModal.events.register('show', this.onRecipeShow.bind(this));
  }

  private onRecipeSelected(recipeId: number): void {
    this._refs.recipePreviewModal.show(RecipeService.getInstance().byId(recipeId));
  }

  private onRecipeShow(recipeId: number): void {
    myRouter.goto('recipe', { id: recipeId.toString() });
  }
}

MainPage.register();
