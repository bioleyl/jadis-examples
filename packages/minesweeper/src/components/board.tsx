import { assert, css, Jadis } from '@jadis/core';

import { appBus } from '../services/bus.service';
import { CellComponent } from './cell';

import type { GameStates, GridSize } from '../types/game.type';

const style = css`
  .board {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
  }

  .grid-row {
    display: flex;
  }

  .footer {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
`;

export class BoardComponent extends Jadis {
  static readonly selector = 'board-component';
  private readonly _cells: Map<string, CellComponent> = new Map();
  private _boardSize: GridSize = [0, 0];
  private _bombCount = 0;

  private readonly _flaggedCount = this.useChange(0, (count) => this.events.emit('fcChange', count));

  private readonly _refs = this.useRefs((ref) => ({
    board: ref('.board'),
  }));

  events = this.useEvents<{
    fcChange: number;
    state: GameStates;
  }>();

  templateHtml(): Node {
    return <div class="board" />;
  }

  templateCss(): string {
    return style;
  }

  init(size: GridSize, bombCount: number): void {
    this._boardSize = size;
    this._bombCount = bombCount;
    this._flaggedCount.set(0);
    this.buildBoard();
  }

  private dispatchBombs(): void {
    const [row, col] = this._boardSize;
    const bombPositions = this.getRndBombPositions(this._bombCount, [row, col]);
    bombPositions.forEach((cell) => {
      cell.bomb = true;
      this.getNeighboringCells(cell).forEach((n) => {
        n.addNeighborBombCount();
      });
    });
  }

  private getRndBombPositions(quantity: number, [row, col]: GridSize): Array<CellComponent> {
    const positions: Set<CellComponent> = new Set();
    while (positions.size < quantity) {
      const x = Math.floor(Math.random() * col);
      const y = Math.floor(Math.random() * row);
      const cell = this._cells.get(this.buildCellKey(x, y));
      assert(cell, `Cell not found for coordinates: (${x}, ${y})`);
      positions.add(cell);
    }
    return Array.from(positions);
  }

  private buildBoard(): void {
    const [row] = this._boardSize;
    this._cells.clear();
    this._refs.board.replaceChildren(...Array.from({ length: row }).map((_, y) => this.buildRow(y)));
    this.dispatchBombs();
  }

  private buildRow(y: number): HTMLDivElement {
    const [_, col] = this._boardSize;
    const row = <div class="grid-row" />;
    Array.from({ length: col }).forEach((_, x) => {
      this.buildCell(x, y, row);
    });
    return row;
  }

  private buildCell(x: number, y: number, row: HTMLDivElement): CellComponent {
    const cell = <CellComponent class="grid-cell" coordinates={{ x, y }} />;
    row.appendChild(cell);
    cell.events.register('clicked', this.cellClicked.bind(this, cell));
    cell.events.register('flagged', () => this._flaggedCount.set((v) => v + 1));
    cell.events.register('unflagged', () => this._flaggedCount.set((v) => v - 1));
    cell.events.register('pushed', () => this.events.emit('state', 'trying'));
    cell.events.register('released', () => this.events.emit('state', 'playing'));
    this._cells.set(this.buildCellKey(x, y), cell);
    return cell;
  }

  private cellClicked(cell: CellComponent): void {
    this.cellsToReveal(cell).forEach((c) => {
      c.reveal();
    });
    this.checkWinCondition();
  }

  private cellsToReveal(cell: CellComponent, stack = new Set<CellComponent>()): Set<CellComponent> {
    return cell.hasNeighborBombs
      ? stack
      : this.getNeighboringCells(cell)
          .filter((n) => !n.isRevealed && !n.isFlagged && !stack.has(n))
          .reduce((acc, n) => {
            const newStack = new Set(acc);
            newStack.add(n);
            return this.cellsToReveal(n, newStack);
          }, stack);
  }

  private checkWinCondition(): void {
    const revealed = Array.from(this._cells.values()).filter((c) => c.isRevealed).length;

    if (revealed + this._bombCount === this._cells.size) {
      appBus.emit('gameWon');
    }
  }

  private getNeighboringCells(cell: CellComponent): Array<CellComponent> {
    const { x, y } = cell.coordinates;
    return [
      this._cells.get(this.buildCellKey(x - 1, y - 1)),
      this._cells.get(this.buildCellKey(x - 1, y)),
      this._cells.get(this.buildCellKey(x - 1, y + 1)),
      this._cells.get(this.buildCellKey(x, y - 1)),
      this._cells.get(this.buildCellKey(x, y + 1)),
      this._cells.get(this.buildCellKey(x + 1, y - 1)),
      this._cells.get(this.buildCellKey(x + 1, y)),
      this._cells.get(this.buildCellKey(x + 1, y + 1)),
    ].filter((cell) => cell !== undefined);
  }

  private buildCellKey(x: number, y: number): string {
    return `${y},${x}`;
  }
}

BoardComponent.register();
