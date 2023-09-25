const typescript = require('@rollup/plugin-typescript');
const swc = require('@swc/core');
const dts = require('dts-bundle-generator');
const define = require('rollup-plugin-define');
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

const bundleTypes = ({ publicTypes }) => ({
  generateBundle(_, bundle) {
    const typeFiles = Object.keys(bundle)
      .filter(it => (
        it.endsWith('.d.ts')
        && !it.includes('enable-legacy-experimental-decorators-types')
      ));

    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }

    typeFiles.forEach(file => {
      fs.writeFileSync(`./dist/${file}`, bundle[file].source);
    });

    let types = dts.generateDtsBundle([
      {
        filePath: './dist/index.d.ts',
        output: { noBanner: true },
      }
    ]).join('');

    types = types.replaceAll(/export (type|interface) ([a-zA-Z]+)/g, (...args) => (
      publicTypes.includes(args[2]) ? `export ${args[1]} ${args[2]}` : `${args[1]} ${args[2]}`
    ));

    typeFiles.forEach(it => {
      fs.unlinkSync(`./dist/${it}`);
      delete bundle[it];
    });

    this.emitFile({
      type: 'asset',
      source: types,
      fileName: 'mobx-form-schema.d.ts',
    });
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

module.exports = [true, false].map((isDev) => ({
  input: 'src/index.ts',

  output: {
    file: `dist/mobx-form-schema.${isDev ? 'development' : 'production'}.js`,
    format: 'esm',
  },

  plugins: [
    typescript({
      tsconfig: `./tsconfig.json`,
      declarationDir: 'dist',
      declaration: !isDev,
    }),

    ...(!isDev ? [
      minify(),

      copyTSasDTS([
        'src/enable-legacy-experimental-decorators-types.ts',
      ]),

      bundleTypes({
        publicTypes: [
          'Validate',
          'Watch',
          'Factory',
          'Presentation',
          'ExcludeFormSchema',
          'ExcludedFormSchemaKeyToValue',
          'TypesConfiguration',
          'TFactoryData',
        ],
      })
    ]: []),

    define({
      replacements: {
        __DEV__: JSON.stringify(isDev),
      },
    }),
  ],

  external: [
    'mobx',
  ],
}));
