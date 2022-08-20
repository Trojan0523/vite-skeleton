import type { IAnyObject } from './../defineds/index';

/**
 *
 * @param obj
 * @param key
 */
export function removeObjectProperty<T extends Record<string, any>> (obj: T, key: Array<string>) {
  Array.isArray(key) && key.forEach((item) => {
    Reflect.has(obj, item) && Reflect.deleteProperty(obj, item)
  })
}

/**
 * lazy sleeper
 * @param {number} wait
 */
export function sleeper (wait = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, wait))
}

/**
 * filter non null and undefined value of object
 * @param obj
 * @returns
 */
export function filterNonNullValueOfObject <T extends IAnyObject>(obj: T): Partial<T> {
  if (!(typeof obj === 'object' && obj instanceof Object)) return obj
  const newParams = {}
  for (const [key, value] of Object.entries(obj)) {
    if (obj[key] !== null && obj[key] !== undefined) {
      Object.assign(newParams, {}, {
        [key]: value,
      })
    }
  }
  return newParams
}
