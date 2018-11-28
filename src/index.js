// @flow

import { HELLO } from './consts'
import { connect } from './db/conn'
import jdbc from './config/jdbc.yaml'
import { getBrands } from './data/brands'
import { brandORM } from './db/orm_brand'

const conn = connect(jdbc)

const insertBrands = async () => {
  const brands = await getBrands()
  const ids = []
  brandORM(conn, brands, ids, (ids) => {
    console.log(`successfully insert ${ ids.length }records`)
  })
}

insertBrands()
