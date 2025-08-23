// packages/app-one/vite.config.ts
import { baseConfig } from '../../vite.base';

export default {
  ...baseConfig,
  base: '/jadis-examples/todo-list/',
  build: {
    outDir: '../../public/todo-list',
  },
};
