// @flow

import { createBrowser, destroyBrowser } from './browser/instance'
import { toPinYinKey } from './utils/'

const getProvinces = async (page: any): Promise<Array<Province>> => {
  await page.goto('http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2017/index.html')

  const provinces = await page.$$eval('.provincetable .provincetr a', nodelist => {
    return Array.prototype.map.call(nodelist, i => {
      return {
        text: i.textContent.trim(),
        url: i.href,
      }
    })
  })
  return Promise.resolve(provinces)
}

const getCities = async (page: any, province: Province): Promise<Array<City>> => {
  let highPriCity = false
  if (province.text.indexOf('市') != -1) {
    highPriCity = true
  }
  console.log('goto: ', province.text,'-', province.url)
  await page.goto(province.url)

  const handler = nodelist => {
    return Array.prototype.map.call(nodelist, i => {
      const ns = i.querySelectorAll('a')
      const code = ns[0].textContent.trim().substring(0, 6)
      return {
        text: ns[1].textContent.trim(),
        code,
        url: ns[0].href,
      }
    })
  }

  let cities = await page.$$eval('.citytable .citytr', handler)
  if (cities.length == 0) {
    cities = await page.$$eval('.countytable .countytr', handler)
  }

  const [firstCity] = cities
  province.code = firstCity.code.substring(0, 2) + '0000'

  if (highPriCity) {
    return Promise.resolve([])
  }

  // not high priority city
  // test deep sub city
  /**/let city = cities[cities.length - 1]
  if (city.text.indexOf('直辖县级行政区划') != -1) {
    let subcities = await getCities(page, city)
    cities.pop()
    Array.prototype.push.apply(cities, subcities)
  }

  return Promise.resolve(cities)
}

let id = 100

const toSql = (p: Province, cities: Array<City>): string => {
  const parentId = ++id
  const sql = `
    insert into district (id, name, name_en, name_abbr, name_abbr_en, code, parent_id, create_time, update_time, type) values
    (${ parentId }, '${ p.text }', '${ toPinYinKey(p.text) }', '', '', ${ p.code || '000000' }, 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP(), 'p')${ cities.length == 0 ? '' : `,` }
    ${
      cities.map(i => {
        let py = toPinYinKey(i.text)
        return `(${ ++id }, '${ i.text }', '${ py }', '', '', '${ i.code }', ${ parentId }, UNIX_TIMESTAMP(), UNIX_TIMESTAMP(), 'c')`
      }).join(',\n ')
    };
  `
  return sql
}

const updateDistrict = async () => {
  const bro = await createBrowser()
  const page = await bro.newPage()

  const provinces = await getProvinces(page)
  await page.close()

  for (let p of provinces) {
    let newPage = await bro.newPage()
    let cities = await getCities(newPage, p)
    console.log(cities)
    console.log(toSql(p, cities))
    await newPage.close()
  }

  //await destroyBrowser()
  //await page.close()
}

export {
  updateDistrict,
  getProvinces,
}
