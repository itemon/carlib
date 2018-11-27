// @flow

import { HELLO } from './consts'
import { connect } from './db/conn'
import jdbc from './config/jdbc.yaml'

const conn = connect(jdbc)
console.log('hello world: ', HELLO, conn)
