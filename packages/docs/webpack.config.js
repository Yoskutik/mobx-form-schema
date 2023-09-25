const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const createCacheGroup = (name, packages) => ({
  filename: `${name}.[contenthash].js`,
  test: new RegExp(`node_modules/(${packages.join('|')})/`),
  priority: 1,
  chunks: 'all',
  name,
});

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const shouldAnalyzeBundle = env.analyzeBundle;

  return {
    mode: isProd ? 'production' : 'development',

    devtool: isProd ? false : 'inline-source-map',

    entry: {
      main: './src/index.tsx',
    },

    output: {
      path: path.join(__dirname, 'build'),
      filename: `${isProd ? '[contenthash].' : ''}[name].js`,
      chunkFilename: `./chunks/${isProd ? '[contenthash].' : ''}[id].js`,
      clean: true,
    },

    target: isProd ? 'browserslist' : 'web',

    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: 'ts-loader',
      }, {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      }, {
        test: /\.example$/,
        type: 'asset/source',
      }, {
        test: /\.module\.scss$/,
        exclude: /\.(?!module)\.scss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:4]',
              },
            },
          },
          'sass-loader',
        ]
      }, {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }],
    },

    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@hocs': path.resolve(__dirname, 'src/hocs'),
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
        'mobx-react': 'mobx-react-lite',
      },
      extensions: ['.js', '.ts', '.tsx'],
      mainFields: ['module', 'browser', 'main'],
    },

    resolveLoader: {
      modules: ['node_modules', './'],
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.swcMinify,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: 'vendors',
            test: /node_modules/,
            chunks: 'all',
          },
          react: createCacheGroup('react', [
            'preact',
            'react-router',
            'react-router-dom',
            '@remix-run/router',
            'reflect-metadata',
          ]),
          mobx: createCacheGroup('mobx', [
            'mobx',
            'mobx-react-lite',
          ]),
        }
      },
    },

    plugins: [
      new HtmlPlugin({
        template: './src/index.ejs',
        minify: {
          html5: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributese: true,
          useShortDoctype: true,
        },
      }),
      new CopyPlugin({
        patterns: [
          { from: './public' },
        ],
      }),
      isProd && new MiniCssExtractPlugin({
        filename: '[contenthash].[name].css',
        chunkFilename: 'chunks/[contenthash].[id].css',
      }),
      shouldAnalyzeBundle && new BundleAnalyzerPlugin(),
    ].filter(Boolean),

    devServer: {
      open: true,
    },
  };
};
