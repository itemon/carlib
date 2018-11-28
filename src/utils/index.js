// @flow
//
import pinyin from 'pinyin'
const letterRxp = /[^a-zA-Z]/gi

const toPinYinKey = (chars: string): string => {
  let nameEn = pinyin(chars, {
    style: pinyin.STYLE_NORMAL,
  })
  nameEn = nameEn.map(i => {
    return i[0]
  }).join('')
  nameEn = nameEn.replace(letterRxp, '_').toLowerCase()
  return nameEn
}

export {
  toPinYinKey
}
