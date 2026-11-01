// The example's server. Fastify answers the API; @jadis/fastify renders every other page from the app's routes.
//
//   pnpm dev     Vite serves the browser's code with hot reload, the server entry is rebuilt on every change
//   pnpm build && pnpm start
import { join } from 'node:path';

import jadis from '@jadis/fastify';
import Fastify from 'fastify';

import { RECIPES } from './recipes.data.ts';

import type { RecipeSummary } from '../src/types/recipe.types.ts';

const DEFAULT_PORT = 3000;
const STATUS_NOT_FOUND = 404;
const dev = process.argv.includes('--dev');

const app = Fastify({ logger: { level: process.env.LOG_LEVEL ?? 'info' } });

const summaryOf = ({ servings, slug, title }: RecipeSummary): RecipeSummary => ({ servings, slug, title });

// The API: what the pages fetch, in the browser and in a server render alike.
// biome-ignore lint/style/useNamingConvention: Fastify names a route's type parameters so
app.get<{ Querystring: { q?: string } }>('/api/recipes', async (request) => {
  const query = (request.query.q ?? '').trim().toLowerCase();
  return RECIPES.filter((recipe) => recipe.title.toLowerCase().includes(query)).map(summaryOf);
});

// biome-ignore lint/style/useNamingConvention: Fastify names a route's type parameters so
app.get<{ Params: { slug: string } }>('/api/recipes/:slug', async (request, reply) => {
  const recipe = RECIPES.find((candidate) => candidate.slug === request.params.slug);
  return recipe ?? reply.code(STATUS_NOT_FOUND).send({ error: 'No such recipe' });
});

// Every other GET is a page.
await app.register(jadis, {
  dev: dev ? { vite: await import('vite') } : undefined,
  entry: 'src/entry-server.ts',
  root: join(import.meta.dirname, '..'),
});

await app.listen({ port: Number(process.env.PORT ?? DEFAULT_PORT) });
