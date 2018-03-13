import makeExpress from './setup-express'
import cfg from './config'
import makeRespond from './make-respond'
export { exposeTest } from './make-test'
const app = makeExpress(cfg)
export const express = app
export const config = cfg

export const expose = (endpoints, port) => {
  const bindEndPoint = (endpoint) => {
    app.post(endpoint, (req, res) =>
      makeRespond(endpoints[endpoint], req, res))
  }
  Object.keys(endpoints).forEach(bindEndPoint)
  app.jigma(port)
}

export const errCode = (code) => ({
  __jigmaKind: 'errCode',
  code
})
