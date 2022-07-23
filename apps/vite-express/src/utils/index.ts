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