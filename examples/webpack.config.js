const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'inline-source-map',
    entry: {
      main: './src/index.tsx',
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: `${isProd ? '[contenthash]' : '[name]'}.bundle.js`,
      chunkFilename: `./chunks/${isProd ? '[contenthash]' : '[id]'}.chunk.js`,
      clean: true,
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          allowTsInNodeModules: true,
        }
      }, {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      }, {
        test: /\.example$/,
        type: 'asset/source',
      }, {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:4]',
              }
            }
          },
          'sass-loader',
        ],
      }],
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@yoskutik/mobx-form-schema': path.resolve(__dirname, '../packages/mobx-form-schema/src'),
        'mobx': path.resolve(__dirname, 'node_modules/mobx'),
      },
      extensions: ['.js', '.ts', '.tsx'],
    },
    optimization: {
      minimizer: [
        new TerserPlugin(),
      ],
    },
    plugins: [
      new HtmlPlugin(),
    ],
    devServer: {
      open: true,
    },
  };
};
