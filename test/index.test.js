import { exposeTest, errCode } from './../src'
const asyncPromise = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('slow text')
  }, 100);
})

test('it takes routes and expose them', async () => {
  const result = await exposeTest({
    '/cats': async () => {
      return {awesome: 'cool'}
    }
  })('/cats')
  expect(result.status).toBe(200)
  expect(result.response.awesome).toBe('cool')
})

test('it respond with errCode', async () => {
  const result = await exposeTest({
    '/cats': async () => {
      return errCode(401)
    }
  })('/cats')
  expect(result.status).toBe(401)
})

test('it handle inputs', async () => {
  const result = await exposeTest({
    '/cats': async ({ input }) => {
      return 'welcome ' + input.name
    }
  })
  ('/cats', { name: 'Simon Madsen' })
  expect(result.status).toBe(200)
  expect(result.response).toBe('welcome Simon Madsen')
})

test('it handles jwt', async () => {
  const requestTests = exposeTest({
    '/signin': async ({ jwtSign }) => {
      const token = jwtSign({ user: 1 })
      return { token }
    },
    '/api-route': async ({ jwtVerify }) => {
      const verify = await jwtVerify()
      if(!verify){
        return errCode(401)
      }
      return { verify}
    },
  })

  const unauthorized = await requestTests('/api-route')
  expect(unauthorized.status).toBe(401)

  const signin = await requestTests('/signin')

  const headers = {}
  headers['x-access-token'] = signin.response.token

  const authorized = await requestTests('/api-route', null, headers)
  expect(authorized.status).toBe(200)
})

test('it handles promise', async () => {
  const result = await exposeTest({
    '/cats': async () => {
      return asyncPromise()
    }
  })('/cats')
  expect(result.status).toBe(200)
  expect(result.response).toBe('slow text')
})

test('it handles async', async () => {
  const result = await exposeTest({
    '/cats': async () => {
      return {awesome: await asyncPromise()}
    }
  })('/cats')
  expect(result.status).toBe(200)
  expect(result.response.awesome).toBe('slow text')
})

test('its fails on bad enpoint', async () => {
  try {
    const result = await exposeTest({
      '/cats': async () => {
        return {awesome: 'cool'}
      }
    })('/fake-endpoint')
    expect(1).toBe('it needs to fail here')
  } catch (error) {
    expect(1).toBe(1)
  }
})