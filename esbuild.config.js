// esbuild.config.js
const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    outfile: './dist/index.js',
    format: 'cjs',
    platform: 'node',
    sourcemap: true,
    target: 'node18',
    external: ['react', 'react-dom', 'typescript', 'react-transition-group'],
  })
  .catch(() => process.exit(1));
