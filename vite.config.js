import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about/index.html'),
        projects: resolve(import.meta.dirname, 'projects/index.html'),
        skills: resolve(import.meta.dirname, 'skills/index.html'),
      },
    },
  },
});
