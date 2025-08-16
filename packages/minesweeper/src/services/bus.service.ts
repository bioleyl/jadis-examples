import { Bus } from '@jadis/core';

export const appBus = new Bus<{
  gameOver: undefined;
  gameWon: undefined;
}>();
