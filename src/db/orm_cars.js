// @flow

import { toPinYinKey } from '../utils/'
import mysql from 'mysql'

/**
 * a b c d e
 * b
 * 0 1 2 3
 * 2
 */
const findBrandIdByName = (name: string, brands: Array<any>): ?string => {
  const sampleKey = toPinYinKey(name)
  let low = 0, high = brands.length - 1, mid: number = low + high >> 1
  let orderSign: number, found: number = -1
  let size = brands.length, i = 0

  // fast resolution
  if (sampleKey.localeCompare(brands[low].name_en) < 0
    || sampleKey.localeCompare(brands[high].name_en) > 0) {
    return null
  }

  while (low <= high) {
    orderSign = sampleKey.localeCompare(brands[mid].name_en)
    //console.log(`low ${ low } high ${ high } mid ${ mid }`)
    if (orderSign < 0)
      high = mid
    else if (orderSign > 0)
      low = mid
    else {
      found = mid
      break
    }
    mid = low + high >> 1
    if (i++ > size)
      break
  }
  //console.log('found brand: ', found > -1 ? brands[found] : null)
  return found != -1 ? brands[found].id : null
}

const getAllBrands = (conn: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    conn.query('select * from car_vendor', (err, results) => {
      if (err)
        reject (err)
      else {
        results.forEach (i => {
          i.name_en = toPinYinKey(i.name)
        })
        results.sort ((a, b) => {
          return a.name_en.localeCompare(b.name_en)
        })
        resolve(results)
      }
    })
  })
}

const insertCar = (conn: any, record: CarCols): Promise<bool> => {
  const { vid, oem, create_time, update_time, name, thumb } = record
  const sql = mysql.format('insert into car (name, vid, oem, thumb, create_time, update_time) values (?, ?, ?, ?, ?, ?)',
    [ name, vid, oem, thumb, create_time, update_time ])

  return new Promise((resolve, reject) => {
    conn.query(sql, (err, records) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

export {
  findBrandIdByName,
  getAllBrands,
  insertCar,
}
