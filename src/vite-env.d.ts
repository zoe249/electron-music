/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface SucType {
  code: number
  data: any
  message: number | string
}
type aliaType = string[]

interface artistType {
  albumSize: number
  alias: aliaType
  fansGroup: null | any
  id: number
  img1v1Url: string
  name: string
  picId: number
  [key?: string]: any
}
interface SongType {
  id: number
  name: string
  picUrl: string | number
  alias: aliaType[]
  mark: number
  pirId: number
  publishTime: number
  size: number
  status: number
  [key?: string]: any
}

interface musicInfoType {
  name: string
  musicUrl: string
  id: number | null
  picUrl: string
  author: string
  duration: number?
}