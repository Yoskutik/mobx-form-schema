const typescript = require('rollup-plugin-typescript2');
const swc = require('@swc/core');
const dts = require('dts-bundle-generator');
const fs = require('fs');
const fse = require('fs-extra');
const tsconfig = require('./tsconfig.json');
const alias = require("@rollup/plugin-alias");
const path = require("path");

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

    // console.log(bundle)

    typeFiles.forEach(file => {
      fse.outputFileSync(`./dist/${file}`, bundle[file].source);
    });

    const types = dts.generateDtsBundle([{ filePath: './dist/mobx-form-schema/src/index.d.ts' }]).join('');

    typeFiles.forEach(it => {
      fs.unlinkSync(`./dist/${it}`);
      delete bundle[it];
    });

    fs.rmSync('./dist/mobx-form-schema', { recursive: true, force: true });
    fs.rmSync('./dist/manual-form-schema', { recursive: true, force: true });

    this.emitFile({
      type: 'asset',
      source: types,
      fileName: 'mobx-form-schema.d.ts',
    });
  },
});

module.exports = {
  input: 'src/index.ts',
  output: {
    file: `dist/mobx-form-schema.js`,
    format: 'esm',
  },
  plugins: [
    typescript({
      tsconfig: `./tsconfig.json`,
      declarationDir: 'dist',
      declaration: true,
    }),
    alias({
      entries: [
        { find: '@yoskutik/manual-form-schema', replacement: path.resolve(__dirname, '../manual-form-schema') },
      ]
    }),
    bundleTypes(),
    minify(),
  ],
  external: [
    'mobx',
  ],
};
