/*
 * @Descripttion: plop模板
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-12 11:37:20
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-12 11:40:36
 */
const pageGenerator = require('./plop-templates/page/prompt')
const componentGenerator = require('./plop-templates/component/prompt')

module.exports = function (plop) {
  plop.setGenerator('page', pageGenerator)
  plop.setGenerator('component', componentGenerator)
}
