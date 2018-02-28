import app from './setup-express'
import makeRespond from './make-respond'
export { exposeTest } from './make-test'

export const expose = (endpoints) => {
  const bindEndPoint = (endpoint) => {
    app.post(endpoint, (req, res) =>
      makeRespond(endpoints[endpoint], req, res))
  }
  Object.keys(endpoints).forEach(bindEndPoint)
}

export const errCode = (code) => ({
  __jigmaKind: 'errCode',
  code
})