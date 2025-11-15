import { assert, html, Jadis } from '@jadis/core';

import { BoardComponent } from '../../components/board';
import { myRouter } from '../../router';
import { appBus } from '../../services/bus.service';
import { rules } from '../../services/rules.service';
import { GameDifficulty } from '../../types/game.type';
import style from './game-page.css?inline';

import type { GameStates, GridSize } from '../../types/game.type';

class GamePage extends Jadis {
  static readonly selector = 'minesweeper-game-page';
  private _boardSize: GridSize = [0, 0];
  private _bombCount = 0;

  private readonly _face = this.useChange<GameStates>(
    'playing',
    (state) => {
      this._refs.face.textContent = rules.getFaceByState(state);
    },
    { immediate: true }
  );

  private readonly _flagCount = this.useChange<number>(
    0,
    (count) => {
      this._refs.minesLeft.textContent = `${this._bombCount - count}`;
    },
    { immediate: true }
  );

  private readonly _refs = this.useRefs((ref) => ({
    backButton: ref('#back'),
    boardComponent: ref<BoardComponent>('board-component'),
    face: ref('.face'),
    gameOver: ref('.game-over'),
    gameWon: ref('.game-won'),
    minesLeft: ref('#mines-left'),
    resetButton: ref('#reset'),
  }));

  onConnect(): void {
    this.on(this._refs.backButton, 'click', () => myRouter.gotoName('MainPage'));
    this.on(this._refs.resetButton, 'click', this.startGame.bind(this));
    this.onBus(appBus, 'gameOver', this.gameOver.bind(this));
    this.onBus(appBus, 'gameWon', this.gameWon.bind(this));
    this._refs.boardComponent.events.register('fcChange', (count) => this._flagCount.set(count));
    this._refs.boardComponent.events.register('state', (state) => this._face.set(state));
    this._boardSize = rules.getGridByDifficulty(this.difficulty);
    this._bombCount = rules.getBombCountByDifficulty(this.difficulty);
    this.startGame();
  }

  templateHtml(): DocumentFragment {
    return html`
      <div class="content">
        <div class="face"></div>
        <p>Mines to detect: <span id="mines-left">0</span></p>
        ${BoardComponent.toTemplate()}
        <div class="game-status game-over">Game Over!</div>
        <div class="game-status game-won">You won!</div>
        <div class="footer">
          <button id="back">Back to main screen</button>
          <button id="reset" style="display: none;">Restart Game</button>
        </div>
      </div>
    `;
  }

  templateCss(): string {
    return style;
  }

  private get difficulty(): GameDifficulty {
    const difficulty = this.getAttribute('difficulty');
    assert(this.isValidDifficulty(difficulty), `Invalid difficulty: ${difficulty}`);
    return difficulty;
  }

  private isValidDifficulty(difficulty: string | null): difficulty is GameDifficulty {
    return Object.values(GameDifficulty).includes(difficulty as GameDifficulty);
  }

  private startGame(): void {
    this._refs.resetButton.style.display = 'none';
    this._refs.gameOver.style.display = 'none';
    this._refs.gameWon.style.display = 'none';
    this._refs.boardComponent.init(this._boardSize, this._bombCount);
    this._face.set('playing');
  }

  private gameWon(): void {
    this._refs.resetButton.style.display = 'block';
    this._refs.gameWon.style.display = 'block';
    this._face.set('won');
  }

  private gameOver(): void {
    this._refs.resetButton.style.display = 'block';
    this._refs.gameOver.style.display = 'block';
    this._face.set('lost');
  }
}

GamePage.register();

export default GamePage;
