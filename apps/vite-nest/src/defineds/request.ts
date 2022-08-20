import { IAnyObject } from './index'

export interface IResult<T> {
  code: string | number,
  msg: string,
  data: T | IAnyObject,
}
