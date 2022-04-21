/*
 * @Descripttion: 全局设置
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-11 11:02:14
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-21 10:46:30
 */
const setting = {
  title: '玖为教育',
  // title: 'vue3-mobile-vant-基础框架',
  /**
   * @type {boolean} true | false
   * @description Whether  open prod mock
   */
  openProdMock: true,
  /**
   * @type {string | array} 'dev' | ['prod','test','dev'] according to the .env file props of VITE_APP_ENV
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['dev', 'test']
   */
  errorLog: ['prod'],
  /*
   * setting dev token when  isNeedLogin is setting false
   * */
  tmpToken: 'tmp_token',

  /*
   * vite.config.js base config
   * such as
   * */
  viteBasePath: './',
}

export default setting
