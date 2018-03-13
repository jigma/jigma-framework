# Jigma
###### Dead simple framework for building web services
All Jigma endpoint is POST type.

### Dead simple
Jigma is a way of exposing an object containing endpoints.
The Object key is the endpoint path, and the value is an endpoint function.
```
const endpoints = {

  '/create-user': async ({ input }) => {
    return { pets: (await createUser(input)) }
  },

  '/toggle-online': async ({ input }) => {
    try {
      await toggleOnline(input.userId)
      return { status: 'success' }  
    } catch (error) {
      return { status: 'error', error }  
    }
  }

}
```
### Endpoint function
The endpoint function is called, when the route path is requested. An endpoint function is responding the request with the return value of the function. The endpoint function can handle async function and promises, and will resolve the value before responding the request. 
```
{
 '/': async ({ input }) => {
    return { user: (await createUser(input)) }
  },
  '/pets': () => getPets(), // will resove the promise and respond with the pets.
  '/users': () => getUsers(),
}
```

### Simple example
This example is creating two post endpoints, all endpoints created with the expose function is post endpoints.
- http://localhost:8080/demo with the response:
{
    "demo": "true"
}

- http://localhost:8080/ with the response:
{
    "pets": [
        {
            "name": "Coco"
        },
        {
            "name": "Bella"
        },
        {
            "name": "Max"
        }
    ]
}
```
const {
  expose
} = require('jigma')

// fake async storage
const getPets = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      { name: 'Coco' },
      { name: 'Bella' },
      { name: 'Max' },
    ])
  }, 500);
})

const endpoints = {
  '/': async ({ input }) => {
    return { pets: (await getPets()) }
  },
  '/demo': async () => {
    return { demo: 'true' }
  }
}

expose(endpoints, 8080)
```
### Inputs
The parameter in the route function got an input property. The input property is containing all passed values in query string and JSON body.
```
'/create-user': async ({ input }) => {
  const user = await storeUser({
  	username: input.username,
    name: input.name,
    age: input.age
  })
  return { status: 'user is created', user }
}
```
