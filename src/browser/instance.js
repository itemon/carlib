// @flow
import puppeteer from 'puppeteer'

let bro

const createBrowser = async () => {
  return bro = await puppeteer.launch({
    headless: true,
  })
}

const destroyBrowser = async () => {
  if (bro) {
    await bro.close()
  }
}

export {
  createBrowser,
  destroyBrowser,
}
