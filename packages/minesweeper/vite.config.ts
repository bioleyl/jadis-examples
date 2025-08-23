// packages/app-one/vite.config.ts
import { baseConfig } from '../../vite.base';

export default {
  ...baseConfig,
  base: '/jadis-examples/minesweeper/',
  build: {
    outDir: '../../public/minesweeper',
  },
};
