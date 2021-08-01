const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const Pack = require('./package.json')

const Routes = require('./routes')
const Blockchain = require('./blockchain/Blockchain')

const init = async () => {
  const server = await new Hapi.Server({
    port: 3000,
    host: '0.0.0.0',
    routes: {
      cors: true
    }
  })

  server.app.bcInstance = new Blockchain()

  const swaggerOptions = {
    info: {
      title: 'Smallest Blockchain API Documentation',
      version: Pack.version
    }
  }

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  server.routes(Routes)

  try {
    await server.start()
    console.log(`Server running at : ${server.info.uri}`)
  } catch (err) {
    console.log(err)
  }
}

init()
