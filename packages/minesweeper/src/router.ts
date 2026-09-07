import { defineRoutes, Router } from '@jadis/core';

import GamePage from './pages/game/game-page';
import MainPage from './pages/main/main-page';

export const myRouter = new Router(
  defineRoutes({
    game: { page: GamePage, path: '/game/:difficulty' },
    main: { page: MainPage, path: '/' },
  }),
  {
    baseUrl: '/jadis-examples/minesweeper/',
    mode: 'hash',
  }
);
