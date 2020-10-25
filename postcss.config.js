import postCssMixinsPlugin from 'postcss-mixins'
import postCssSimpleVarsPlugin from 'postcss-simple-vars'
import postCssModulesExtendRulePrePlugin from 'postcss-modules-extend-rule/pre'
import autoprefixerPlugin from 'autoprefixer'
import postCssNestedPlugin from 'postcss-nested'
import { appDirectory } from './utils/utils'

const config = {
  plugins: [
    postCssMixinsPlugin({
      silent: true,
      mixinsDir: `${appDirectory}src/styles/mixins`,
    }),
    postCssSimpleVarsPlugin,
    postCssNestedPlugin,
    postCssModulesExtendRulePrePlugin,
    autoprefixerPlugin,
  ],
}

export default config
