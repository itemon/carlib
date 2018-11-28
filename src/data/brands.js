// @flow

import { URL_BRAND, DEBUG } from '../consts'
import { getNetworkData, getNetworkImageStream } from './netutil'
import { toPinYinKey } from '../utils/'
import { resolve, extname } from 'path'
import { createWriteStream } from 'fs'

const getBrands = async (): Promise<Array<Object>> => {
  const brandParam: HttpParam = {
    url: URL_BRAND,
    encoding: 'gbk',
  }
  const resp = await getNetworkData(brandParam)
  return Promise.resolve(resp.result.branditems)
}

const saveLogoToDisk = async (brand: any): Promise<string> => {
  const { logo, name } = brand
  const diskPath = resolve(__dirname,
    DEBUG ? '../../thumbs/' : '../thumbs',
    toPinYinKey(name) + extname(logo))

  console.log(`downloading ${ logo } => ${ diskPath }`)
  const picStream = await getNetworkImageStream(logo)
  const diskStream = createWriteStream(diskPath)
  picStream.pipe(diskStream)
  return Promise.resolve(diskPath)
}

export {
  getBrands,
  saveLogoToDisk,
}
