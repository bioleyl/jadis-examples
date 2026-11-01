import type { ActiveRoute } from '@jadis/core';
import type { Recipe, RecipeSummary } from './recipe.types';

/** Sends a request to the API: the browser's fetch, or on the server Node's. */
export type ApiRequest = (path: string) => Promise<Response>;

/** The app's API, the same in the browser and in a server render. */
export interface Api {
  recipes(query: string): Promise<RecipeSummary[]>;
  recipe(slug: string): Promise<Recipe | undefined>;
}

/**
 * A page that loads what it shows: on the server before the render, in the browser after a navigation. Once loaded,
 * it can give the response's status and the page's title.
 */
export interface LoadingPage {
  load(route: ActiveRoute, api: Api): Promise<void>;
  httpStatus?(): number;
  pageTitle?(): string;
}
