export type IAnyObject = Record<string, any>
import type { AxiosInstance, Method } from 'axios'

/**
 * 请求方式
 */
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type Methods = Extract<Method, keyof AxiosInstance>
