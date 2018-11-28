// @flow

import { saveLogoToDisk } from '../src/data/brands'
import { existsSync } from 'fs'

test ('测试保存网络图片到本地', async () => {
  const conf = {
    logo: 'https://car3.autoimg.cn/cardfs/series/g26/M05/AA/A1/100x100_f40_autohomecar__wKgHEVs8raOAIlAJAAAsu8M_vL0825.png',
    name: '宝沃',
  }
  const path = await saveLogoToDisk(conf)
  expect(existsSync(path)).toBeTruthy()
})
