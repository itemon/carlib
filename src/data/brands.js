// @flow

import axios from 'axios'
import { URL_BRANDS } from '../consts'

const getNetworkData = async (opts: HttpParam): any => {
  const { url } = opts
  const resp = await axios.get(url)
  return resp
}

const getBrands = () => {
}
