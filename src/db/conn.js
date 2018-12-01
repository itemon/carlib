// @flow

let conn = null
import mysql from 'mysql'

const connect = (jdbc: Object) => {
  const connConfig = {
    ...jdbc,
  }

  conn = mysql.createConnection(connConfig)
  try {
    conn.connect((err) => {
      if (err)
        console.error('Can not establish connection ', err)
    })
  } catch (err) {
    console.error('Can not establish connection ', err)
    conn = null
  }
  return conn
}

const disconnect = () => {
  if (conn) {
    conn.end()
  }
}

export {
  connect,
  disconnect,
}
