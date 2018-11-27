// @flow

import axios from 'axios'
import { URL_BRAND } from '../consts'

const getNetworkData = async (opts: HttpParam): Promise<any> => {
  const { url } = opts
  const resp = await axios.get(url)
  return Promise.resolve(resp.data)
}

const getBrands = async (): Promise<Array<Object>> => {
  const brandParam: HttpParam = {
    url: URL_BRAND,
  }
  const resp = await getNetworkData(brandParam)
  return Promise.resolve(resp.result.branditems)
}

export {
  getBrands
}
