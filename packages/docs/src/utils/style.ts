import { addPxUnit } from './common'

const unitKeys = ['fontSize', 'lineHeight', 'borderWidth', 'borderRadius']
const textStyleKeys = [
  'fontSize',
  'fontWeight',
  'fontFamily',
  'color',
  'lineHeight',
  'fontStyle',
  'textDecoration',
  'justifyContent',
  'alignItems'
]
export function pickStyle(obj: AnyObject | undefined, flag: boolean = true) {
  if (!obj) return obj
  const result: AnyObject = {}
  const keys = Object.keys(obj).filter(key => {
    return flag ? textStyleKeys.includes(key) : !textStyleKeys.includes(key)
  })
  for (const key of keys) {
    result[key] = unitKeys.includes(key) ? addPxUnit(obj[key]) : obj[key]
  }
  return result
}
type AnyObject = { [key in string]: any }
// 实现 pick 函数
export function pick(obj: AnyObject, keys: string[]) {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key]
    }
    return acc
  }, {} as AnyObject)
}

// 实现 omit 函数
export function omit(obj: AnyObject, keys: string[]) {
  return Object.keys(obj).reduce((acc, key) => {
    if (!keys.includes(key)) {
      acc[key] = obj[key]
    }
    return acc
  }, {} as AnyObject)
}
