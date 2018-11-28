
import { URL_BRAND } from './consts'
import axios from 'axios'
import iconv from 'iconv-lite'

axios({
  responseType: 'stream',
  url: URL_BRAND,
  method: 'get',
})
.then (resp => {
  let data = resp.data
  //let gbk = iconv.decode(data, 'gbk')
  let chunk = data.read(1024)

  let gbkStream = iconv.decodeStream('gbk')
  gbkStream.on('data', (str) => {
    console.log(str)
  })
  data.pipe(gbkStream)
})
