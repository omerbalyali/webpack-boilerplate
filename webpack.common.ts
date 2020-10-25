import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import { WebpackPluginServe } from 'webpack-plugin-serve'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import PostCSSAssetsPlugin from 'postcss-assets-webpack-plugin'
import CONFIG_OPTIONS from './webpack.options'
import postcssModulesExtendPluginPost from 'postcss-modules-extend-rule/post'
import { appDirectory } from './utils/utils'

const devMode = process.env.NODE_ENV !== 'production'
const simulateProduction = CONFIG_OPTIONS.development.simulateProduction

const transpileJS: webpack.RuleSetRule = {
  test: CONFIG_OPTIONS.regex.js,
  include: `${appDirectory}/${CONFIG_OPTIONS.paths.src}`,
  use: ['babel-loader'],
  exclude: /node_modules/,
}
const transpileTS: webpack.RuleSetRule = {
  test: CONFIG_OPTIONS.regex.ts,
  use: [
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  ],
  exclude: /node_modules/,
}
const extractCSSPlugin = new MiniCSSExtractPlugin({
  filename: `${CONFIG_OPTIONS.paths.assetsFolder}/${CONFIG_OPTIONS.paths.assets.styles}/${CONFIG_OPTIONS.compilation.output.css}`,
})
const cssModulesSettings = CONFIG_OPTIONS.compilation.cssModules
  ? {
      mode: 'local',
      auto: true,
      exportGlobals: true,
      localIdentName: devMode
        ? CONFIG_OPTIONS.compilation.output.cssModuleIdentDevelopment
        : CONFIG_OPTIONS.compilation.output.cssModuleIdentProduction,
      // localIdentHashPrefix: CONFIG_OPTIONS.compilation.output.cssModuleHashPrefix,
    }
  : false
const extractCSS: webpack.RuleSetRule = {
  test: CONFIG_OPTIONS.regex.css,
  use: [
    {
      loader:
        devMode && !simulateProduction
          ? 'style-loader'
          : MiniCSSExtractPlugin.loader,
      options:
        devMode && !simulateProduction
          ? {}
          : {
              hmr: true,
            },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap:
          CONFIG_OPTIONS.development.sourceMaps.cssSourceMaps && devMode,
        modules: cssModulesSettings,
        importLoaders: 1,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap:
          CONFIG_OPTIONS.development.sourceMaps.cssSourceMaps && devMode,
        postcssOptions: {
          config: `${appDirectory}/postcss.config.js`,
        },
      },
    },
  ],
}
const extractImages: webpack.RuleSetRule[] = [
  {
    test: CONFIG_OPTIONS.regex.images,
    use: {
      loader: 'url-loader',
      options: {
        limit: CONFIG_OPTIONS.compilation.media.inlineImageLimit,
        fallback: 'file-loader',
        name: `${CONFIG_OPTIONS.paths.assetsFolder}/${CONFIG_OPTIONS.paths.staticAssetsFolder}/${CONFIG_OPTIONS.paths.assets.images}/${CONFIG_OPTIONS.compilation.output.image}`,
      },
    },
  },
  {
    test: CONFIG_OPTIONS.regex.svgs,
    use: {
      loader: 'svg-url-loader',
      options: {
        name: `${CONFIG_OPTIONS.paths.assetsFolder}/${CONFIG_OPTIONS.paths.staticAssetsFolder}/${CONFIG_OPTIONS.paths.assets.images}/${CONFIG_OPTIONS.compilation.output.image}`,
        limit: 10 * 1024,
        noquotes: true,
      },
    },
  },
]
const optimizeImages: webpack.RuleSetRule =
  devMode && !simulateProduction
    ? {}
    : {
        test: CONFIG_OPTIONS.regex.compression,
        use: [
          {
            loader: 'image-webpack-loader',
            options: CONFIG_OPTIONS.compilation.compressionOptions,
          },
        ],
        enforce: 'pre',
      }
const extractFonts = ''

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'Webpack Boilerplate',
  // path: path.resolve(__dirname, `${CONFIG_OPTIONS.paths.dist}`),
  template: `${appDirectory}/public/index.html`,
  filename: 'index.html',
})
const postCSSAssetsPlugin = new PostCSSAssetsPlugin({
  test: CONFIG_OPTIONS.regex.css,
  plugins: [postcssModulesExtendPluginPost],
})
const tsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin({
  async: !CONFIG_OPTIONS.compilation.shouldWaitForTypeErrors,
  eslint: {
    files: './src/**/*',
  },
})
const esLintWebpackPlugin = new ESLintPlugin()
const faviconsPlugin = ''
const manifestPlugin =
  devMode && !simulateProduction
    ? () => {
        return null
      }
    : new ManifestPlugin()
const cleanWebpackPlugin = new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: ['**/*'],
  cleanAfterEveryBuildPatterns: [
    `!${CONFIG_OPTIONS.paths.assetsFolder}/${CONFIG_OPTIONS.paths.staticAssetsFolder}/**/*.*`,
  ],
})
const dashboardPlugin = ''
const webpackPluginServe = new WebpackPluginServe({
  port: CONFIG_OPTIONS.development.devServer.port || 8080,
  static: `${appDirectory}/${CONFIG_OPTIONS.paths.dist}`,
  liveReload: true,
  waitForBuild: true,
  progress: false,
})

const webpackCommonParts = {
  devMode,
  transpileJS,
  transpileTS,
  extractCSS,
  extractCSSPlugin,
  extractImages,
  optimizeImages,
  extractFonts,
  htmlWebpackPlugin,
  postCSSAssetsPlugin,
  tsCheckerWebpackPlugin,
  esLintWebpackPlugin,
  faviconsPlugin,
  manifestPlugin,
  dashboardPlugin,
  webpackPluginServe,
  cleanWebpackPlugin,
}

export default webpackCommonParts
