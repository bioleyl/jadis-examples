import { createElement, html, Jadis } from '@jadis/core';

import { myRouter } from '../../router';
import { GameDifficulty } from '../../types/game.type';
import style from './main-page.css?inline';

class MainPage extends Jadis {
  static readonly selector = 'minesweeper-main-page';

  templateCss(): string {
    return style;
  }

  templateHtml(): DocumentFragment {
    return html`
      <h1 class="title">💣 Mine Sweeper</h1>
      <p>Welcome to the Minesweeper game! Choose your difficulty level to start playing.</p>
      <div class="difficulty-selection">${this.buildButtons()}</div>
    `;
  }

  private buildButtons(): Array<HTMLButtonElement> {
    return Object.entries(GameDifficulty).map(([difficulty, token]) => this.buildButton(difficulty, token));
  }

  private buildButton(label: string, token: GameDifficulty): HTMLButtonElement {
    const button = createElement('button', { class: 'difficulty-button' });
    button.textContent = label;
    this.on(button, 'click', () => myRouter.gotoName('GamePage', { difficulty: token }));
    return button;
  }
}

MainPage.register();

export default MainPage;
