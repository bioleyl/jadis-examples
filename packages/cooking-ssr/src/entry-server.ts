// The server's side of the app: the page of a URL, rendered from the routes the browser's router follows. It runs in
// a worker thread of @jadis/fastify, with happy-dom as its DOM.
import { renderRoute } from '@jadis/core/server';

import { serverApi } from './api';
import { routes } from './routes';

import type { RenderPage } from '@jadis/fastify';
import type { RouteName } from './routes';
import type { LoadingPage } from './types/api.types';

const STATUS = { notFound: 404, ok: 200 } as const;
const TITLES: Record<RouteName, string> = {
  notFound: 'Not found',
  recipe: 'Recipe',
  recipes: 'Recipes',
};
// The pages are the same for every visitor: a cache in front of the server may keep them a minute.
const PUBLIC_CACHE = { 'cache-control': 'public, max-age=60' };

const loads = (page: HTMLElement): page is HTMLElement & LoadingPage =>
  'load' in page && typeof page.load === 'function';

const escapeText = (text: string): string => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const render: RenderPage = async (url, _request, server) => {
  const api = serverApi(server);
  const rendered = await renderRoute(routes, url, {
    // The page loads what it shows before the render: its data goes out in the markup.
    prepare: async (page, route) => (loads(page) ? page.load(route, api) : undefined),
  });
  if (!rendered) {
    return { body: '', status: STATUS.notFound };
  }
  const name = rendered.route.name as RouteName;
  const page = loads(rendered.page) ? rendered.page : undefined;
  const title = page?.pageTitle?.() ?? TITLES[name];
  return {
    body: rendered.body,
    head: `<title>${escapeText(title)} · Cooking</title>`,
    headers: PUBLIC_CACHE,
    status: page?.httpStatus?.() ?? (name === 'notFound' ? STATUS.notFound : STATUS.ok),
  };
};
