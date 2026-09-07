import { defineRoutes, Router } from '@jadis/core';

import { MainPage } from './pages/main-page';
import { RecipePage } from './pages/recipe-page';

export const myRouter = new Router(
  defineRoutes({
    main: { page: MainPage, path: '/' },
    recipe: { page: RecipePage, path: '/recipe/:id' },
  }),
  {
    baseUrl: '/jadis-examples/cooking/',
    mode: 'hash',
  }
);
