const typescript = require('@rollup/plugin-typescript');
const swc = require('@swc/core');
const fs = require('fs');
const tsconfig = require('./tsconfig.json');

const minify = () => ({
  async generateBundle(_, bundle) {
    await Promise.all(
      Object.entries(bundle)
        .filter(([filename]) => filename.endsWith('js'))
        .map(async ([filename, { name, code }]) => {
          const minified = await swc.transform(code, {
            minify: true,
            jsc: {
              target: tsconfig.compilerOptions.target,
              minify: {
                mangle: true,
                compress: true,
              },
            },
          });

          delete bundle[filename];

          this.emitFile({
            type: 'asset',
            source: minified.code,
            fileName: filename,
          });
        })
    );
  },
});

const copyTSasDTS = (files) => ({
  generateBundle() {
    files.forEach(file => {
      const fileName = file.replace(/\.ts$/, '.d.ts').replace('src/', '');

      this.emitFile({
        type: 'asset',
        source: fs.readFileSync(file),
        fileName,
      });

      this.emitFile({
        type: 'asset',
        source: 'export {}',
        fileName: fileName.replace(/\.d\.ts$/, '.js'),
      });
    });
  },
});

module.exports = {
  input: ['src/index.ts', 'src/mobx-automate.ts'],
  output: {
    dir: 'dist',
    preserveModules: true,
    format: 'esm',
  },
  plugins: [
    typescript({
      tsconfig: `./tsconfig.json`,
      declarationDir: 'dist',
      declaration: true,
    }),
    minify(),
    copyTSasDTS([
      'src/enable-es-decorators-types.ts',
    ]),
  ],
  external: [
    'mobx',
  ],
};
