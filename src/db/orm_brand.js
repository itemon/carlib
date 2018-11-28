// @flow

import { toPinYinKey } from '../utils/'
import mysql from 'mysql'
import { extname } from 'path'

const brandORM = (conn: any, brands: Array<Object>, insertIds: Array<number>, callback?: (ids: Array<number>) => void) => {
  if (brands.length == 0) {
    if (callback)
      callback.call(callback, insertIds)
    return
  }

  let b: any = brands.shift()
  let nameEn = toPinYinKey(b.name)
  let now = Date.now()

  const sql = mysql.format('INSERT INTO car_vendor (name, name_en, thumb, create_time, update_time) values (?, ?, ?, ?, ?)', [
    b.name,
    nameEn,
    nameEn + extname(b.logo),
    now,
    now
  ])

  conn.query(sql, (err, results, fields) => {
    if (err) {
      console.log('insert row failed ', err)
    } else {
      console.log('insert row with id ', results.insertId)
      insertIds.push(results.insertId)
    }
    brandORM(conn, brands, insertIds, callback)
  })
}

export {
  brandORM
}
