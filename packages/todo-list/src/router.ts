import { defineRoutes, Router } from '@jadis/core';

import { MainPage } from './pages/main/main-page';

export const myRouter = new Router(
  defineRoutes({
    main: { page: MainPage, path: '/' },
  }),
  {
    baseUrl: '/jadis-examples/todo-list/',
    mode: 'hash',
  }
);
