import { assert, html, Jadis } from '@jadis/core';
import style from './game-page.css?inline';
import { myRouter } from '../../router';
import { GameDifficulty, GameStates, GridSize } from '../../types/game.type';
import { RulesService } from '../../services/rules.service';
import { BoardComponent } from '../../components/board';
import { appBus } from '../../services/bus.service';

class GamePage extends Jadis {
  static readonly selector = 'minesweeper-game-page';
  private boardSize: GridSize = [0, 0];
  private bombCount = 0;

  onConnect(): void {
    this.on(this.backButton, 'click', () => myRouter.gotoName('MainPage'));
    this.on(this.resetButton, 'click', this.startGame.bind(this));
    this.onBus(appBus, 'gameOver', this.gameOver.bind(this));
    this.onBus(appBus, 'gameWon', this.gameWon.bind(this));
    this.boardComponent.events.register('fcChange', this.fcChanged.bind(this));
    this.boardComponent.events.register('state', this.setFaceState.bind(this));
    this.boardSize = RulesService.getGridByDifficulty(this.difficulty);
    this.bombCount = RulesService.getBombCountByDifficulty(this.difficulty);
    this.startGame();
  }

  templateHtml(): DocumentFragment {
    return html`
      <div class="content">
        <div class="face"></div>
        <p>Mines to detect: <span id="mines-left">0</span></p>
        ${BoardComponent.createElement()}
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

  private get boardComponent(): BoardComponent {
    return this.getElement('board-component');
  }

  private get backButton(): HTMLButtonElement {
    return this.getElement('#back');
  }

  private get resetButton(): HTMLButtonElement {
    return this.getElement('#reset');
  }

  private get minesLeft(): HTMLSpanElement {
    return this.getElement('#mines-left');
  }

  private setFaceState(state: GameStates): void {
    const face = this.getElement('.face');
    face.textContent = RulesService.getFaceByState(state);
  }

  private isValidDifficulty(difficulty: string | null): difficulty is GameDifficulty {
    return Object.values(GameDifficulty).includes(difficulty as GameDifficulty);
  }

  private startGame(): void {
    this.resetButton.style.display = 'none';
    this.getElement('.game-over').style.display = 'none';
    this.getElement('.game-won').style.display = 'none';
    this.minesLeft.textContent = `${this.bombCount}`;
    this.boardComponent.init(this.boardSize, this.bombCount);
    this.setFaceState('playing');
  }

  private gameWon(): void {
    this.resetButton.style.display = 'block';
    this.getElement('.game-won').style.display = 'block';
    this.setFaceState('won');
  }

  private gameOver(): void {
    this.resetButton.style.display = 'block';
    this.getElement('.game-over').style.display = 'block';
    this.setFaceState('lost');
  }

  private fcChanged(count: number): void {
    this.minesLeft.textContent = `${this.bombCount - count}`;
  }
}

GamePage.register();

export default GamePage;
