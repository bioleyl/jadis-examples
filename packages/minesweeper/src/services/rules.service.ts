import { GameDifficulty, GameStates, GridSize } from '../types/game.type';

const GRID_SIZES: Record<GameDifficulty, GridSize> = {
  [GameDifficulty.Easy]: [8, 8],
  [GameDifficulty.Medium]: [16, 16],
  [GameDifficulty.Hard]: [24, 24],
};

const BOMB_COUNT: Record<GameDifficulty, number> = {
  [GameDifficulty.Easy]: 8,
  [GameDifficulty.Medium]: 40,
  [GameDifficulty.Hard]: 99,
};

const FACES: Record<GameStates, string> = {
  playing: '🙂',
  trying: '😐',
  lost: '😢',
  won: '😄',
};

export class RulesService {
  static getGridByDifficulty(difficulty: GameDifficulty): GridSize {
    return GRID_SIZES[difficulty] || GRID_SIZES[GameDifficulty.Easy];
  }

  static getBombCountByDifficulty(difficulty: GameDifficulty): number {
    return BOMB_COUNT[difficulty] || BOMB_COUNT[GameDifficulty.Easy];
  }

  static getTextColorByBombCount(bombCount: number): string {
    switch (bombCount) {
      case 1:
        return 'blue';
      case 2:
        return 'green';
      case 3:
        return 'red';
      case 4:
        return 'purple';
      case 5:
        return 'brown';
      case 6:
        return 'cyan';
      case 7:
        return 'darkred';
      case 8:
        return 'gray';
      default:
        return 'black';
    }
  }

  static getFaceByState(state: GameStates): string {
    return FACES[state] || FACES.playing;
  }
}
