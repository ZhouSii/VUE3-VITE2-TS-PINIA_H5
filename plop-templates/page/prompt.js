/*
 * @Descripttion: 页面模板
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-12 11:22:37
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-12 11:42:58
 */
const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a page',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'page name please',
    validate: notEmpty('name')
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true
    },
    {
      name: '<script>',
      value: 'script',
      checked: true
    },
    {
      name: 'style',
      value: 'style',
      checked: true
    }
    ],
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return 'View require at least a <script> or <template> tag.'
      }
      return true
    }
  }
  ],
  actions: data => {
    const name = '{{name}}'
    const actions = [{
      type: 'add',
      path: `src/views/${name}/index.vue`,
      templateFile: 'plop-templates/page/index.hbs',
      data: {
        name: name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }]

    return actions
  }
}
