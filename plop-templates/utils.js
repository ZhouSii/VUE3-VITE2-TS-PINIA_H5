/*
 * @Descripttion: 模板工具
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-12 11:22:37
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-12 11:41:29
 */
exports.notEmpty = (name) => {
  return (v) => {
    if (!v || v.trim === '') {
      return `${name} is required`
    } else {
      return true
    }
  }
}

exports.toFirstUpper = (name) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1)
}
