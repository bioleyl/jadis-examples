import { baseConfig } from '../../vite.base.js';

// The page in the browser (dist/client) and the render on the server (dist/server). This example needs a Node server:
// its build stays here, out of the static site the other examples are deployed to.
export default ({ isSsrBuild }: { isSsrBuild?: boolean }) => ({
  ...baseConfig,
  build: {
    outDir: isSsrBuild ? 'dist/server' : 'dist/client',
  },
  // The server bundle holds the app's code and Jadis: @jadis/fastify's workers set up the DOM before loading it.
  ssr: { noExternal: true },
});
