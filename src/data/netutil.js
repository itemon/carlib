// @flow

import axios from 'axios'
import iconv from 'iconv-lite'

/**
 * support encoding converting
 */
const getNetworkData = async (opts: HttpParam): Promise<any> => {
  const { url, encoding = 'utf8' } = opts
  const resp = await axios({
    url,
    method: 'get',
    responseType: 'stream',
  })

  const decodingStream = iconv.decodeStream(encoding)
  return new Promise( (resolve, reject ) => {
    let text = []
    decodingStream.on('data', (chars) => {
      text.push(chars)
    })
    decodingStream.on('end', () => {
      try {
        let json = JSON.parse(text.join(''))
        resolve(json)
      } catch (e) {
        reject(new Error(`Json decoding error ${ e.message }`))
      }
    })
    decodingStream.on('error', () => {
      reject(new Error(`Decoding using ${ encoding } error`))
    })
    resp.data.pipe(decodingStream)
  })
}

const getNetworkImageStream = async (url: string): Promise<Object> => {
  const resp = await axios({
    url,
    method: 'get',
    responseType: 'stream',
  })
  return Promise.resolve(resp.data)
}

export {
  getNetworkData,
  getNetworkImageStream,
}
