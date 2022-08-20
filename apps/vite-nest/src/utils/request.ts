import * as qs from 'qs'
import * as url from 'url'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { IAnyObject, Methods } from 'src/defineds'
import * as utils from '../utils/index'
import { IResult } from 'src/defineds/request'

class Axios {
  /**
   * axios实例
   */
  private _axiosCustom: AxiosInstance | null

  /**
   * 仓库实例
   */
  private _store: IAnyObject

  constructor () {
    // axios实例
    this._axiosCustom = null
    // 仓库实例
    this._store = {}

    this.request = this.request.bind(this)
    this.get = this.get.bind(this)
    this.post = this.post.bind(this)
    this.put = this.put.bind(this)
    this.patch = this.patch.bind(this)
    this.delete = this.delete.bind(this)
    this.setStore = this.setStore.bind(this)

    this._initAxios()
  }
  // 初始化axios
  private _initAxios(): void {
    this._axiosCustom = axios.create({
      timeout: (2 * 60 * 1000),
    })
  }
  /**
   * 设置公共参数
   */
  // eslint-disable-next-line
  private _getParams (params: IAnyObject = {}, config: IAnyObject = {}) {
    let newParams: IAnyObject | null = null
    newParams = params
    return utils.filterNonNullValueOfObject({
      ...newParams,
    })
  }
  /**
   * 计算url
   * @param {string} url
   * @param {string} target
   * @returns {string}
   */
  private _getUrl (url: string, target: string) {
    if (/https?:/.test(url)) return url
    switch (target) {
    case 'local': {
      return `${url}`
    }
    }
  }

  /**
   * 设置公共header
   * @param {T} headers
   * @param {T} params
   * @param href
   * @returns {T} 请求头新
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _getHeader(headers: IAnyObject, params: IAnyObject, href: string): IAnyObject {
    const globalHeaders: IAnyObject = {}
    return utils.filterNonNullValueOfObject({
      ...globalHeaders,
      ...headers,
    })
  }
  /**
   * 核心请求方法
   * @param href
   */
  public request<T> (href: string, params: IAnyObject, config: IAnyObject= {}): Promise<IResult<T>> {
    if (!this._axiosCustom) return Promise.resolve({ code : -1, msg: 'Axios实例未初始化', data: {} })
    const {
      paramsType = 'form-data',
      noGlobalParams = false,
      target =  'local',
    } = config
    if (!href) return Promise.reject(new Error('缺少请求Url'))

    const newParams = noGlobalParams ? params : this._getParams(params, config)
    const newHref = this._getUrl(href, target)

    const args: AxiosRequestConfig = {
      method: 'POST' as Methods,
      url: newHref,
      ...{
        ...config,
        headers: this._getHeader(config.headers, newParams, href)
      },
    }
    // 处理href传参
    if (args.method?.toLowerCase() === 'get') {
      Object.assign(args, {
        params: newParams || {},
      })
    } else if (args.method?.toLowerCase() === 'post' && paramsType === 'form-data') {
      Object.assign(args, {
        data: qs.stringify(newParams) || '',
      })
    } else if (args.method?.toLowerCase() === 'post' && paramsType === 'raw') {
      Object.assign(args, {
        data: newParams,
      })
    } else {
      console.warn('paramsType的有效值为form-data|raw')
    }
    return this._axiosCustom(args).then(async res => {
      const { data } = res
      switch (target) {
      case 'local': {
        if (data?.code !== 100) {
          switch (data?.code) {
          default: {
            const errMsg = data?.msg || '未知的服务器错误'
            const errCod = data?.code
          }
          }
        }
        break
      }
      }
      return data
    }, async error => {
      const newError = {
        originError: error,
        status: error?.response?.status || -100,
        data: error?.response?.data || {},
      }
      return Promise.reject(newError)
    })
  }

  _get<T> (href: string, params: IAnyObject = {}, config: IAnyObject= {}, outTime = -1, requestMethod = 'request'): Promise<IResult<T>> {
    if (!href) return Promise.reject(new Error('missing entry'))
    const newConfig = {
      headers: config.headers || {},
      method: 'get',
      paramsType: 'form-data',
      ...config,
    }
    // url上的参数取出，放到parmas中
    const urlObj = url.parse(href)
    const newHref = url.format(Object.assign(urlObj, {
      query: '',
      search: '',
    }))
    const queryObj = qs.parse(urlObj.query as string)
    const newParams = {
      ...queryObj,
      ...params,
    }
    if (requestMethod === 'request') {
      return this[requestMethod](newHref, newParams, newConfig)
    } else {
      throw new Error ('can`t find the function want to call')
    }
  }

  _post<T> (href: string, params: IAnyObject = {}, config: IAnyObject = {}, outTime = -1, requestMethod = 'request'): Promise<IResult<T>> {
    if (!href) return Promise.reject(new Error('missing entry'))
    const newConfig = {
      headers: config.headers || {},
      method: 'post',
      paramsType: 'form-data',
      ...config,
    }

    if (!newConfig.headers['content-type']) {
      Object.assign(newConfig.headers, {
        'content-type': 'application/x-www-form-urlencoded',
      })
    }

    if (config.paramsType === 'raw') {
      Object.assign(newConfig.headers, {
        'content-type': 'application/json',
      })
    }

    if (newConfig.headers['content-type'] === 'application/json') {
      newConfig.paramsType = 'raw'
    } else if (newConfig.headers['content-type'] === 'application/x-www-form-urlencoded') {
      newConfig.paramsType = 'form-data'
    }
    if (config.uploadFile) {
      Object.assign(newConfig.headers, {
        'content-type': 'multipart/form-data',
      })
    }
    // url上的参数取出，放到parmas中
    const urlObj = url.parse(href)
    const newHref = url.format(Object.assign(urlObj, {
      query: '',
      search: '',
    }))
    const queryObj = qs.parse(urlObj.query as string)
    const newParams = {
      ...queryObj,
      ...params,
    }
    if (requestMethod === 'request') {
      return this[requestMethod](newHref, newParams, newConfig)
    } else {
      throw new Error ('can`t find the function want to call')
    }
  }

  /**
   * get请求 tips: api接口返回值类型统一命名方式 以I + 命名 + Result命令 ex: IInfoMemberResult
   * @param href: string 请求的地址
   * @param params: object 请求参数，选填，默认: {}
   * @param config: object axios参数，选填，默认: {}
   * @returns Promise<any>
   */
  async get<T> (href: string, params: IAnyObject = {}, config: IAnyObject = {}, outTime = -1): Promise<IResult<T>> {
    return this._get(href, params, config, outTime)
  }

  /**
   * post请求 tips: api接口返回值类型统一命名方式 以I + 命名 + Result命令 ex: IInfoMemberResult
   * @param href: string 请求的地址
   * @param params: object 请求参数，选填，默认: {}
   * @param config: object axios参数，选填，默认: {}
   * @returns Promise<any>
   */
  async post<T> (href: string, params: IAnyObject = {}, config: IAnyObject = {}, outTime = -1): Promise<IResult<T>> {
    return this._post(href, params, config, outTime)
  }

  async put<T> (href: string, params: IAnyObject = {}, config: IAnyObject = {}): Promise<IResult<T>> {
    Object.assign(config, {
      method: config.method || 'put'
    })
    return this.post(href, params, config)
  }

  async patch<T> (href: string, params: IAnyObject = {}, config: IAnyObject = {}): Promise<IResult<T>> {
    Object.assign(config, {
      method: config.method || 'patch'
    })
    return this.post(href, params, config)
  }

  async delete<T> (href: string, params: IAnyObject = {}, config: IAnyObject = {}): Promise<IResult<T>> {
    Object.assign(config, {
      method: config.method || 'delete'
    })
    return this.post(href, params, config)
  }

  /**
   * 设置store实例
   */
  public setStore (store: IAnyObject) {
    this._store = store
  }
}

export default new Axios()
