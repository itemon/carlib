// @flow
//

import { toPinYinKey } from '../src/utils/'

test ('测试汉字转拼音: 阿尔法·罗密欧=> aerfa_luomiou', () => {
  let key = toPinYinKey('阿尔法·罗密欧')
  expect(key).toEqual('aerfa_luomiou')
})

test ('测试汉字转拼音: Mercedes Benz=> mercedes_benz', () => {
  let key = toPinYinKey('Mercedes Benz')
  expect(key).toEqual('mercedes_benz')
})
