// packages/app-one/vite.config.ts
import { baseConfig } from '../../vite.base.js';

export default {
  ...baseConfig,
  base: '/jadis-examples/minesweeper/',
  build: {
    outDir: '../../public/minesweeper',
  },
};
