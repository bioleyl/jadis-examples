export enum GameDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export type GridSize = [row: number, col: number];

export type CellCoordinates = {
  x: number;
  y: number;
};

export type GameStates = 'playing' | 'trying' | 'lost' | 'won';
