/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-06 15:56:43
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-12 16:14:25
 */
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    // "postcss-import": {},
    // "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    // "autoprefixer": {},

    "postcss-px-to-viewport": {
      viewportWidth: 768, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 667, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 8, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [
        "ignore",
        "hairlines",
        "viewBox",
        "viewItem",
        "viewTitle",
        "viewPic",
        "downImg",
      ], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      exclude: /(\/|\\)(node_modules)(\/|\\)/, //排除不用转的文件
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
    },
    
    // "postcss-viewport-units":{},
  },
};
