/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-14 10:24:06
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-20 18:29:12
 */
import { removeToken } from './auth'

/**
 * 身份证处理
 * @param  idCard
 */
export function getIdCardStar(idCard: string) {
  return idCard.replace(/^(.{2})(?:\d+)(.{2})$/, '$1**************$2')
}

/**
 * 姓名处理
 * @param  realName
 */
export function getNameStr(realName: string) {
  let star = ''
  for (let i = 1; i < realName.length; i++) {
    star += '*'
  }
  realName = realName.replace(/^(.{1})(.*)$/, '$1' + star)

  return realName
}

/**
 * 电话处理
 * @param  tel
 */
export function geTel(tel: string) {
  var reg = /^(\d{3})\d{4}(\d{4})$/
  return tel.replace(reg, '$1****$2')
}

/**
 * 从身份证获取生日
 * @param {}} idCard
 */
export function getBirthdayFromIdCard(idCard: string) {
  let birthday =
    idCard.substring(6, 10) + '-' + idCard.substring(10, 12) + '-' + idCard.substring(12, 14)
  return birthday
}

/**
 * 去登录
 */
export function goToLogin() {
  removeToken()
  location.reload()
}

// Parse the time to string
export const parseTime = (
  time?: object | string | number | null,
  cFormat?: string
): string | null => {
  if (time === undefined || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

// Format and filter json data using filterKeys array
export const formatJson = (filterKeys: any, jsonData: any) =>
  jsonData.map((data: any) =>
    filterKeys.map((key: string) => {
      if (key === 'timestamp') {
        return parseTime(data[key])
      } else {
        return data[key]
      }
    })
  )

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) ele.className += ' ' + className
}

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// Toggle class for the selected element
export const toggleClass = (ele: HTMLElement, className: string) => {
  if (!ele || !className) {
    return
  }
  let classString = ele.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  ele.className = classString
}

/**
 * ES6: base64编码
 * @param  commonContent
 */

export function encodeBase64Content(commonContent: any): void {
  let base64Content: any = Buffer.from(commonContent).toString('base64')
  return base64Content
}

/**
 * ES6: base64解码
 * @param  commonContent
 */

export function decodeBase64Content(base64Content: any): void {
  let commonContent: any = base64Content.replace(/\s/g, '+')
  commonContent = Buffer.from(commonContent, 'base64').toString()
  return commonContent
}

/**
 * 获取地址栏的参数
 * @param  name
 */
export function getUrlParam(name: any): string | null {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

//深拷贝
export function objectMerge(...objs: any): any {
  var options: { [x: string]: any }
  var name: string | number
  var src: any
  var copy: undefined
  var copyIsArray: boolean
  var clone: any[]
  var target = arguments[0] || {}
  var i = 1
  var length = arguments.length
  var deep = true
  var obj = {}

  // 是否深层拷贝可以通过第一个参数控制
  if (typeof target === 'boolean') {
    deep = target

    // 往前移，去获取要合并的对象信息
    target = arguments[i] || {}
    i++
  }

  // 当合并对象为其它类型的值时，则忽略
  if (typeof target !== 'object' && !(typeof target === 'function')) {
    target = {}
  }

  // 当只传了一个参数过来时
  if (i === length) {
    // 当仅传一个参数时
    target = Array.isArray(target) ? [] : {}
    i--
  }

  for (; i < length; i++) {
    // 合并对象必须为非null或者undefined值
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 避免循环引用的copy情况
        if (target === copy) {
          continue
        }

        copyIsArray = Array.isArray(copy)

        // 当为数组或者对象时处理深层拷贝
        if (deep && copy && (obj.toString.call(copy) === '[object Object]' || copyIsArray)) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && obj.toString.call(src) ? src : {}
          }

          // 不要修改原有的数据
          target[name] = objectMerge(deep, clone, copy)

          // undefined值不用传递过去
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  // Return the modified object
  return target
}

//处理题目数据
export function disposeTm(data: { isGroup: number }) {
  let resp = objectMerge(data)
  resp.optionsArr = []
  if (data.isGroup == 1) {
    resp.tm = resp.content
    resp.optionsArr.push({
      option: JSON.parse(resp.option),
    })
  } else {
    let childList = resp.childList
    resp.tm = resp.stem
    childList.forEach((item: { content: any; option: string }) => {
      resp.optionsArr.push({
        title: item.content,
        option: JSON.parse(item.option),
      })
    })
  }
  return resp
}
