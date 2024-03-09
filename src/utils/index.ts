/**
 * 函数防抖
 * @param func 回调函数
 * @param wait 延迟执行的时间
 * @param immediate 是否立即执行一次
 */
export function debounce(
  func: (val: string) => void,
  wait: number,
  immediate = true
) {
  let timeout: any, result: any
  return function (this: any) {
    const self = this
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过，不再执行
      const callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(self, args as any)
    } else {
      timeout = setTimeout(function () {
        func.apply(self, args as any)
      }, wait)
    }
    return result
  }
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: any) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== '' &&
            typeof value[key] !== 'undefined'
          ) {
            params = propName + '[' + key + ']'
            const subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}
