const webpackOptions = {
  title: 'Webpack Boilerplate',
  appName: 'webpack-boilerplate',
  developer: 'Omer Balyali',
  developerURL: 'http://www.omerbalyali.com',
  paths: {
    src: 'src',
    dist: 'dist',
    publicPath: '/',
    pages: 'pages',
    templates: 'templates',
    assetsFolder: 'assets',
    staticAssetsFolder: 'static',
    assets: {
      styles: 'styles',
      scripts: 'scripts',
      images: 'images',
      fonts: 'fonts',
    },
  },
  compilation: {
    preferredHashLength: 8,
    shouldWaitForTypeErrors: true,
    cssModules: true,
    entry: {
      mainIndex: 'src/index',
      extensions: ['tsx', 'ts', 'jsx', 'js'],
      entries: {},
    },
    output: {
      js: '[name]-[contenthash].min.js',
      css: '[name]-[contenthash].min.css',
      cssModuleIdentDevelopment: '[name]__[local]--[hash:base64:5]',
      cssModuleIdentProduction: '[hash:base64]',
      cssModuleHashPrefix: '',
      image: '[name].[contenthash].[ext]',
      font: '[name].[ext]',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    media: {
      inlineImageLimit: 150,
    },
    compressionOptions: {
      svgo: {
        cleanupIDs: true,
      },
      images: {
        mozjpeg: {
          progressive: true,
          quality: 80,
        },
        optipng: {
          enabled: true,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        gifsicle: {
          interlaced: false,
        },
      },
    },
  },
  development: {
    simulateProduction: true,
    devServer: {
      host: 'localhost',
      port: 3000,
      open: false,
      overlay: true,
    },
    sourceMaps: {
      devtool: 'inline-source-map',
      cssSourceMaps: true,
      jsSourceMaps: true,
    },
  },
  regex: {
    js: /\.jsx?$/,
    ts: /\.tsx?$/,
    css: /\.css$/,
    cssModules: /\.module\.css$/,
    images: /\.(jpe?g|png|gif)$/,
    svgs: /\.svg$/,
    compression: /\.(jpe?g|png|gif|svg)$/,
    fonts: /\.(ttf|eot|woff|woff2)$/,
  },
}

export default webpackOptions
