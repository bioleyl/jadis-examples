import { defineRouteGroup, defineRoutes } from '@jadis/core';

import { SiteRoot } from './layout/site-root';
import { NotFoundPage } from './pages/not-found-page';
import { RecipePage } from './pages/recipe-page';
import { RecipesPage } from './pages/recipes-page';

/**
 * The app's one route table: the browser's router follows it (src/entry-client.ts), and the server renders from it
 * (src/entry-server.ts). The first route that matches wins: the catch-all comes last, after the group (Biome sorts the
 * keys of an object, but not across a spread).
 */
export const routes = defineRoutes({
  ...defineRouteGroup(
    '/',
    {
      recipe: { page: RecipePage, path: '/recipes/:slug' },
      recipes: { page: RecipesPage, path: '/' },
    },
    { rootComponentSelector: SiteRoot.selector }
  ),
  notFound: { page: NotFoundPage, path: '/:rest' },
});

export type RouteName = keyof typeof routes;
