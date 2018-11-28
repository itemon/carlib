// @flow

import { connect, disconnect } from '../src/db/conn'
import { readJDBC } from '../libs/utils'

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
