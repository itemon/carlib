
import { readFileSync } from 'fs'
import { resolve } from 'path'
import yaml from 'yaml'

const readYAML = (file) => {
  const content = readFileSync(file, 'utf8')
  return yaml.parse(content)
}

const readJDBC = () => {
  return readYAML(resolve(__dirname, '../src/config/jdbc.yaml'))
}

export {
  readJDBC,
}
