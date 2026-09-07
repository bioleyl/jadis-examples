import { Jadis } from '@jadis/core';

import { myRouter } from '../../router';
import { GameDifficulty } from '../../types/game.type';
import style from './main-page.css?inline';

class MainPage extends Jadis {
  static readonly selector = 'minesweeper-main-page';

  private readonly _refs = this.useRefs((ref) => ({
    difficultySelection: ref('.difficulty-selection'),
  }));

  onConnect(): void {
    this.on(this._refs.difficultySelection, 'click', (event) => {
      if (!(event.target instanceof HTMLButtonElement)) {
        return;
      }

      const difficulty = event.target.dataset.difficulty;
      if (this.isValidDifficulty(difficulty)) {
        myRouter.goto('game', { difficulty });
      }
    });
  }

  templateCss(): string {
    return style;
  }

  templateHtml(): Node {
    return (
      <>
        <h1 class="title">💣 Mine Sweeper</h1>
        <p>Welcome to the Minesweeper game! Choose your difficulty level to start playing.</p>
        <div class="difficulty-selection">{this.buildButtons()}</div>
      </>
    );
  }

  private buildButtons(): Array<HTMLButtonElement> {
    return Object.entries(GameDifficulty).map(([difficulty, token]) => this.buildButton(difficulty, token));
  }

  private buildButton(label: string, token: GameDifficulty): HTMLButtonElement {
    return <button class="difficulty-button" data-difficulty={token}>{label}</button>;
  }

  private isValidDifficulty(difficulty: string | undefined): difficulty is GameDifficulty {
    return Object.values(GameDifficulty).includes(difficulty as GameDifficulty);
  }
}

MainPage.register();

export default MainPage;
