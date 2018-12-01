// @flow

import { HELLO } from './consts'
import { connect, disconnect } from './db/conn'
import jdbc from './config/jdbc.yaml'
import { getBrands } from './data/brands'
import { brandORM, logoSaveORM } from './db/orm_brand'
import { getAllBrands, findBrandIdByName, insertCar } from './db/orm_cars'
import cars from './data/cars'

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

const insertOEMs = async () => {
  const brands = await getAllBrands(conn)
  cars.forEach (async brand => {
    console.log(`waiting brand ${ brand.N }`)
    const id = findBrandIdByName(brand.N, brands)
    if (id == null) {
      console.error(`can find brand by name ${ brand.N }`)
      return
    }

    const OEMs = brand.List
    const now = Date.now()
    console.log(`\n\ncar brand name ${ brand.N } it is identified by ${ id }`)

    OEMs.forEach (async oem => {
      oem.List.forEach (async serial => {
        const store = {
          name: serial.N,
          oem: oem.N,
          vid: id,
          create_time: now,
          update_time: now,
          thumb: '',
        }
        const done = await insertCar(conn, store)
        console.log(`store ${ JSON.stringify(store) }, and ${ String(done) }`)
      })
    })
  })
}

const [, , args] = process.argv
if (Object.is(args, '--oem')) {
  insertOEMs()
} else {
  insertBrands()
}
