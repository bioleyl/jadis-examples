import { css, html, Jadis } from '@jadis/core';

import { appBus } from '../services/bus.service';
import { rules } from '../services/rules.service';

import type { CellCoordinates } from '../types/game.type';

const style = css`
  :host {
    background-color: #c0c0c0;
    border: 2px solid #fff;
    border-right-color: #808080;
    border-bottom-color: #808080;
    font-weight: bold;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
    box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #fff;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  :host(.revealed) {
    background-color: #f0f0f0;
    border: 1px solid #cccccc;
    box-shadow: none;
    cursor: default;
  }
  :host(.bomb) {
    background-color: #f44336;
  }
  .content {
    font-size: 15px;
    color: #333;
  }
`;

export class CellComponent extends Jadis {
  static readonly selector = 'cell-component';
  private _isFlagged = false;
  private _isBomb = false;
  private _neighborBombCount = 0;
  private _gameOver = false;
  private _isRevealed = false;
  private _isPushed = false;

  coordinates: CellCoordinates = { x: 0, y: 0 };
  events = this.useEvents<{
    pushed: undefined;
    clicked: undefined;
    released: undefined;
    flagged: undefined;
    unflagged: undefined;
  }>();

  onConnect(): void {
    this.on(this, 'mousedown', this.onMouseDown.bind(this));
    this.on(this, 'mouseup', this.onMouseUp.bind(this));
    this.on(this, 'mouseleave', this.onMouseLeave.bind(this));
    this.on(this, 'contextmenu', this.handleRightClick.bind(this));
    this.onBus(appBus, 'gameOver', this.onGameOver.bind(this));
    this.onBus(appBus, 'gameWon', this.onGameWon.bind(this));
  }

  templateHtml(): DocumentFragment {
    return html`<span class="content"></span>`;
  }

  templateCss(): string {
    return style;
  }

  get hasNeighborBombs(): boolean {
    return this._neighborBombCount > 0;
  }

  get isFlagged(): boolean {
    return this._isFlagged;
  }

  get isRevealed(): boolean {
    return this._isRevealed;
  }

  set bomb(value: boolean) {
    this._isBomb = value;
  }

  addNeighborBombCount(): void {
    this._neighborBombCount++;
  }

  reveal(): void {
    this._isRevealed = true;
    this.classList.add('revealed');
    this._isBomb ? this.revealBomb() : this.revealNormal();
  }

  private get formattedText(): string {
    return this._neighborBombCount > 0 ? this._neighborBombCount.toString() : '';
  }

  private onMouseDown(evt: MouseEvent): void {
    if (this._gameOver || this.isRevealed || evt.button !== 0 || this._isFlagged) {
      return;
    }
    this._isPushed = true;
    this.events.emit('pushed');
  }

  private onMouseUp(): void {
    if (this._gameOver || this.isRevealed || !this._isPushed) {
      return;
    }
    this._isPushed = false;
    this.events.emit('released');
    this.handleLeftClick();
  }

  private onMouseLeave(): void {
    if (this._gameOver || this.isRevealed || !this._isPushed) {
      return;
    }
    this._isPushed = false;
    this.events.emit('released');
  }

  private revealBomb(): void {
    this.classList.add('bomb');
    this.getElement('.content').textContent = '💣';
  }

  private revealNormal(): void {
    const content = this.getElement('.content');
    content.textContent = this.formattedText;
    content.style.color = rules.getTextColorByBombCount(this._neighborBombCount);
  }

  private onGameWon(): void {
    this._gameOver = true;
  }

  private onGameOver(): void {
    this._gameOver = true;
    this.reveal();
  }

  private handleLeftClick(): void {
    if (this._isFlagged || this.isRevealed || this._gameOver) {
      return;
    }
    if (this._isBomb) {
      appBus.emit('gameOver');
      return;
    }
    this.reveal();
    this.events.emit('clicked');
  }

  private handleRightClick(evt: MouseEvent): void {
    evt.preventDefault();
    if (this.isRevealed || this._gameOver) {
      return;
    }
    this._isFlagged = !this._isFlagged;
    this.getElement('.content').textContent = this._isFlagged ? '🚩' : '';
    this.events.emit(this._isFlagged ? 'flagged' : 'unflagged');
  }
}

CellComponent.register();
