// @flow

import { HELLO } from './consts'
import { connect } from './db/conn'
import jdbc from './config/jdbc.yaml'
import { getBrands } from './data/brands'

const conn = connect(jdbc)

const insertBrands = async () => {
  const brands = await getBrands()
  brands.map(item => {
    console.log(item.name)
  })
}

insertBrands()
