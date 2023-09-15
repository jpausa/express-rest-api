import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJSON = (jsonPath) => {
  return require(jsonPath)
}
