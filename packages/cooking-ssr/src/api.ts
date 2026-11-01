import type { ServerTools } from '@jadis/fastify';
import type { Api, ApiRequest } from './types/api.types';
import type { Recipe, RecipeSummary } from './types/recipe.types';

const API_RECIPES = '/api/recipes';
const STATUS_NOT_FOUND = 404;

async function json<Value>(response: Response): Promise<Value> {
  if (!response.ok) {
    throw new Error(`${response.url}: ${response.status}`);
  }
  return response.json();
}

/** The API over a way to send requests. */
export function createApi(request: ApiRequest): Api {
  return {
    recipe: async (slug) => {
      const response = await request(`${API_RECIPES}/${encodeURIComponent(slug)}`);
      return response.status === STATUS_NOT_FOUND ? undefined : json<Recipe>(response);
    },
    recipes: async (query) =>
      json<RecipeSummary[]>(await request(`${API_RECIPES}?q=${encodeURIComponent(query)}`)),
  };
}

/** The API in the browser. */
export const browserApi = createApi((path) => fetch(path));

/**
 * The API in a server render: Node's fetch, to the server itself. A page with a visitor's data would pass their
 * cookie here (see the plugin's `requestData`).
 */
export const serverApi = (server: ServerTools): Api =>
  createApi((path) => server.fetch(`${server.origin}${path}`));
