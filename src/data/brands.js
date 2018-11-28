// @flow

import { URL_BRAND } from '../consts'
import { getNetworkData } from './netutil'

const getBrands = async (): Promise<Array<Object>> => {
  const brandParam: HttpParam = {
    url: URL_BRAND,
    encoding: 'gbk',
  }
  const resp = await getNetworkData(brandParam)
  return Promise.resolve(resp.result.branditems)
}

export {
  getBrands
}
