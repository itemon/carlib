// @flow

import { getBrands } from '../src/data/brands'

test ('获取brands列表，测试集是否为空', async () => {
  expect.assertions(1)
  const brands = await getBrands()
  console.log('all brands: ', brands.length)
  expect(brands.length).toBeGreaterThan(0)
})

