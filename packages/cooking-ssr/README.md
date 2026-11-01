# Cooking, rendered on the server

The cooking example's recipes as a site Fastify renders: every page arrives as HTML, readable before any script
runs (and by search engines), then Jadis takes it over in the browser and the next pages show without a page load.

It needs a Node server, so unlike the other examples it is not on GitHub Pages.

```bash
pnpm dev                   # http://localhost:3000: Vite serves the browser's code, the server entry rebuilds on change
pnpm build && pnpm start   # the build
```

Try it with JavaScript turned off in the browser: the list, the search (a plain form) and the recipes all work.

## The files

| | |
|---|---|
| `src/routes.ts` | The app's one route table. The browser's router follows it, the server renders from it |
| `server/main.ts` | Fastify: the API (`/api/recipes`), then `@jadis/fastify`, which renders every other page |
| `src/entry-server.ts` | The page of a URL: `renderRoute` matches it, the page loads its data, the response gets its status, title and cache header |
| `src/entry-client.ts` | The router takes over the page the server rendered, and follows the links from then on |
| `src/pages/` | The pages. `load(route, api)` fills their `data`, bound to an attribute: on the server before the render, in the browser after a navigation |
| `src/api.ts` | The API, over the browser's `fetch` or over Node's in a server render |

## A request

1. `GET /recipes/pancakes`. Fastify has no route for it, so `@jadis/fastify` hands it to a worker thread, where
   happy-dom is the DOM.
2. `renderRoute` finds the `recipe` route and creates `<site-root slug="pancakes"><recipe-page slug="pancakes">`.
   The page's `load` calls `/api/recipes/pancakes` on this server. The recipe goes into `data`, an attribute-bound
   field.
3. The page connects and draws, and is written out as HTML. Each shadow root becomes a
   `<template shadowrootmode="open">`, and the `data` attribute holds the recipe. The status comes from the page
   (`httpStatus()`, 404 for a missing recipe), and so does the title (`pageTitle()`).
4. The browser paints it before any script runs. Then the definitions load: each component upgrades in place, the
   page from its `data` attribute, and the router keeps `site-root > recipe-page` as its current page. The servings
   buttons work from then on.
5. A click on a link shows the next page without a document request. The new page has no data: its `onRoute`
   loads it from the API.

See the server rendering guide of Jadis's documentation for the details.
