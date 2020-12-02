import autoprefixerPlugin from 'autoprefixer'
// import postCssMixinsPlugin from 'postcss-mixins'
// import postCssSimpleVarsPlugin from 'postcss-simple-vars'
// import postCssNestedPlugin from 'postcss-nested'
import postCssExtendRulePlugin from 'postcss-extend-rule'
// import { appDirectory } from './utils/utils'
// import postCssModulesExtendRulePrePlugin from 'postcss-modules-extend-rule/pre'

// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    // postCssMixinsPlugin({
    //   silent: true,
    //   mixinsDir: `${appDirectory}src/styles/mixins`,
    // }),
    // postCssSimpleVarsPlugin,
    // postCssNestedPlugin,
    // postCssModulesExtendRulePrePlugin,
    postCssExtendRulePlugin,
    autoprefixerPlugin,
  ],
}
