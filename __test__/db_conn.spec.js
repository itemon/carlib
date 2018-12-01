// @flow

import { connect, disconnect } from '../src/db/conn'
import { readJDBC } from '../libs/utils'
import { getAllBrands, findBrandIdByName } from '../src/db/orm_cars'

let conn

afterAll (() => {
  disconnect()
})

beforeAll(() => {
  const connConfig = readJDBC()
  conn = connect(connConfig)
})

test ('测试db的连通性', () => {
  expect(conn).toBeDefined()
})

test('获取获取奔驰品牌', async () => {
  expect.assertions(1)
  const brands = await getAllBrands(conn)
  const benz = findBrandIdByName('阿尔法·罗密欧', brands)
  expect(benz).not.toBeNull()
})
