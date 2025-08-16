// packages/app-one/vite.config.ts
import { baseConfig } from '../../vite.base';

export default {
  ...baseConfig,
  build: {
    outDir: '../../public/todo-list',
  },
};
