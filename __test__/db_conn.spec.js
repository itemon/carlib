// @flow

import { connect, disconnect } from '../src/db/conn'
import { readJDBC } from '../libs/utils'

afterAll (() => {
  disconnect()
})

test ('测试db的连通性', () => {
  const connConfig = readJDBC()
  const conn = connect(connConfig)
  expect(conn).toBeDefined()
})
