import path from 'path'
import webpack from 'webpack'

import CONFIG_OPTIONS from './webpack.options'
import COMMON_PARTS from './webpack.common'
import { indexFile } from './utils/utils'

const webpackConfig: webpack.Configuration = {
  mode: COMMON_PARTS.devMode ? 'development' : 'production',
  watch: COMMON_PARTS.devMode,
  watchOptions: {
    // aggregateTimeout: 300,
    poll: 1000,
    ignored: ['node_modules/**'],
  },
  devtool: CONFIG_OPTIONS.development.sourceMaps.devtool,
  entry: {
    main: indexFile(
      CONFIG_OPTIONS.compilation.entry.mainIndex,
      CONFIG_OPTIONS.compilation.entry.extensions
    ),
    ...CONFIG_OPTIONS.compilation.entry.entries,
    wps: ['webpack-plugin-serve/client'],
  },
  output: {
    filename: `${CONFIG_OPTIONS.paths.assetsFolder}/${CONFIG_OPTIONS.paths.assets.scripts}/${CONFIG_OPTIONS.compilation.output.js}`,
    path: path.resolve(__dirname, `${CONFIG_OPTIONS.paths.dist}`),
    publicPath: CONFIG_OPTIONS.paths.publicPath,
    hashDigestLength: CONFIG_OPTIONS.compilation.preferredHashLength,
    chunkLoading: false,
    wasmLoading: false,
  },
  module: {
    rules: [
      COMMON_PARTS.optimizeImages,
      ...COMMON_PARTS.extractImages,
      COMMON_PARTS.extractCSS,
      COMMON_PARTS.transpileTS,
      COMMON_PARTS.transpileJS,
    ],
  },
  resolve: {
    extensions: CONFIG_OPTIONS.compilation.resolve.extensions,
  },
  plugins: [
    COMMON_PARTS.cleanWebpackPlugin,
    COMMON_PARTS.htmlWebpackPlugin,
    COMMON_PARTS.postCSSAssetsPlugin,
    COMMON_PARTS.extractCSSPlugin,
    COMMON_PARTS.tsCheckerWebpackPlugin,
    COMMON_PARTS.esLintWebpackPlugin,
    COMMON_PARTS.manifestPlugin,
    COMMON_PARTS.webpackPluginServe,
  ].filter(Boolean),
}
console.log(webpackConfig.mode)
export default webpackConfig
