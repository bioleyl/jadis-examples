// packages/app-one/vite.config.ts
import { baseConfig } from '../../vite.base.js';

export default {
  ...baseConfig,
  base: '/jadis-examples/cooking/',
  build: {
    outDir: '../../public/cooking',
  },
};
