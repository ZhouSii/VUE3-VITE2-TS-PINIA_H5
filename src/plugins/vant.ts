/*
 * @Descripttion: Vant 组件
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-06 15:23:10
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-20 10:28:25
 */
import { App as VM } from 'vue'
import {
  Button,
  List,
  Cell,
  Tab,
  Tabs,
  Icon,
  Image,
  Checkbox,
  CheckboxGroup,
  Field,
  Uploader,
  CellGroup,
  Calendar,
  DatetimePicker,
  Popup,
  Picker,
  Col,
  Row,
  Toast,
  Notify,
  PullRefresh,
} from 'vant'

const plugins = [
  Button,
  List,
  Cell,
  Tab,
  Tabs,
  Icon,
  Image,
  Checkbox,
  CheckboxGroup,
  Field,
  Uploader,
  CellGroup,
  Calendar,
  DatetimePicker,
  Popup,
  Picker,
  Col,
  Row,
  Toast,
  Notify,
  PullRefresh,
]

export const vantPlugins = {
  install: function (vm: VM) {
    plugins.forEach((item) => {
      vm.component(item.name, item)
    })
  },
}
