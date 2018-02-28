import makeRespond from './make-respond'
export const exposeTest = (endpoints) => (endpointName, params, headers) => {
  return new Promise((resolve,reject) => {
    const endpoint = endpoints[endpointName]
    if (!endpoint){
      reject('endpoint not exists')
      return
    }
    makeRespond(endpoint, { params, headers }, {
      json: (obj) => {
        resolve({
          status: 200,
          response: obj
        })
      },
      sendStatus: (code) => {
        resolve({
          status: code,
          response: {}
        })
      }
    })
  })
}