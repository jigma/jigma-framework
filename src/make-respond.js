const getUserImputs = (req) => {
  let params = Object.assign({}, req.body, req.params)
  params = Object.assign({}, params, req.query)
  params.take = (allowedKeys) => {
    const newObj = {}
    Object.keys(params).forEach((key) => {
      if (allowedKeys.indexOf(key) > -1) {
        newObj[key] = params[key]
      }
    })
    return newObj
  }
  params.only = params.take
  return params
}

const waitForResult = async (result) => {
  switch (result.constructor.name) {
    case 'AsyncFunction':
      result = await result
      break
    case 'Function':
      result = result()
      break
    case 'Promise':
      result = await result
      break
    }
    return result
}
const makeRespond = async (endpointFunc, req, res) => {
  const result = await waitForResult(endpointFunc({
    headers: req.headers,
    req, res,
    input: getUserImputs(req),
  }))
  if(result.constructor.name === 'Object' && result.__jigmaKind ){
    if(result.__jigmaKind === 'errCode'){
      console.log(result.code)
      res.sendStatus(result.code)
      return
    }
  }
  res.json(result)
}

export default makeRespond