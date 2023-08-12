const typescript = require('@rollup/plugin-typescript');
const swc = require('@swc/core');
const dts = require('dts-bundle-generator');
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

const bundleTypes = () => ({
  generateBundle(_, bundle) {
    const typeFiles = Object.keys(bundle)
      .filter(it => (
        it.endsWith('.d.ts')
        && !it.includes('enable-legacy-experimental-decorators-types')
        && !it.includes('TypesConfiguration')
      ));

    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }

    typeFiles.forEach(file => {
      fs.writeFileSync(`./dist/${file}`, bundle[file].source);
    });

    const types = dts.generateDtsBundle([
      {
        filePath: './dist/index.d.ts',
        output: { noBanner: true },
      }
    ]).join('');

    typeFiles.forEach(it => {
      fs.unlinkSync(`./dist/${it}`);
      delete bundle[it];
    });

    this.emitFile({
      type: 'asset',
      source: `import TypesConfiguration from './TypesConfiguration';\n\n${types}`,
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

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/mobx-form-schema.js',
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
        'src/enable-legacy-experimental-decorators-types.ts',
      ]),
      bundleTypes(),
    ],
    external: [
      'mobx',
      './TypesConfiguration',
    ],
  },
];
