import { RouteRecordRaw } from 'vue-router'

export interface IMyRouteItem {
    name?: string,
    path: string,
    redirect?: string | { name: string },
    component?: (() => Promise<typeof import('*.vue')>) | (typeof import('*.vue').default) | string | unknown,
    meta?: {
        title: string,
        alwaysShow?: boolean,
    },
    props?: Record<string, any>,
    hidden?: boolean,
    children?: Array<IMyRouteItem>,
}

export type IRouteItem = RouteRecordRaw | IMyRouteItem
