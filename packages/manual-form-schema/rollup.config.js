const typescript = require('@rollup/plugin-typescript');
const swc = require('@swc/core');
const dts = require('dts-bundle-generator');
const fs = require('fs');
const path = require('path');
const tsconfig = require('./tsconfig.json');

const minify = () => ({
  async generateBundle(_, bundle) {
    const [filename, { name, code }] = Object.entries(bundle)[0];

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
  },
});

const bundleTypes = () => ({
  generateBundle(_, bundle) {
    const typeFiles = Object.keys(bundle).filter(it => it.endsWith('.d.ts'));

    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }

    typeFiles.forEach(file => {
      fs.writeFileSync(`./dist/${file}`, bundle[file].source);
    });

    const types = dts.generateDtsBundle([{ filePath: './dist/index.d.ts' }]).join('');

    typeFiles.forEach(it => {
      fs.unlinkSync(`./dist/${it}`);
      delete bundle[it];
    });

    this.emitFile({
      type: 'asset',
      source: types,
      fileName: 'manual-form-schema.d.ts',
    });
  },
});

module.exports = {
  input: 'src/index.ts',
  output: {
    file: `dist/manual-form-schema.js`,
    format: 'esm',
  },
  plugins: [
    typescript({
      tsconfig: `./tsconfig.json`,
      declarationDir: 'dist',
      declaration: true,
    }),
    bundleTypes(),
    minify(),
  ],
  external: [
    'mobx',
  ],
};
