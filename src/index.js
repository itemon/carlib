// @flow

import { HELLO } from './consts'
import { connect, disconnect } from './db/conn'
import jdbc from './config/jdbc.yaml'
import { getBrands } from './data/brands'
import { brandORM, logoSaveORM } from './db/orm_brand'

const conn = connect(jdbc)

const insertBrands = async () => {
  const brands = await getBrands()
  const ids = []
  brandORM(conn, brands.slice(0), ids, (ids) => {
    console.log(`successfully insert ${ ids.length } records`)
    disconnect()

    logoSaveORM(brands, () => {
      console.log('Image save done')
    })
  })
}

insertBrands()
