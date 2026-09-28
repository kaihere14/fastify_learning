import fastify from "fastify";
import { healthRoutes } from "./health/health.routes";
import dbPlugin from "./db/dbPlugin";
import { animalRoutes } from "./animal/animal.routes";
import fastifyEnv from "@fastify/env";

const app = fastify({
  logger: true
})

//schema for environment variables
const env_schema = {
    type: 'object',
    required: ['PORT','MONGODB_URI'],
    properties: {
      PORT: {
        type: 'integer',
        default: 3000
      },
      MONGODB_URI: { type: 'string' },
    },
}

//options are all together suming up the configuration
const options = {
  confKey: 'config', // optional, default: 'config'
  schema: env_schema,
}

//setting up environment variables using @fastify/env and options we defined
app
  .register(fastifyEnv, options)
  .ready((err) => {
    if (err) {
      app.log.error(err)
      process.exit(1);
    }
  })

//registering plugins and routes
app.register(dbPlugin);
app.register(healthRoutes);
app.register(animalRoutes);

//root route
app.get("/", ((request, reply) =>{
  reply.send({message:"hello world from fastify server"})
}))

//asynchronously parsing the port from environment variables converting it to an integer because process.env.PORT is a string
const port = parseInt(process.env.PORT as string)


//listening on the port and starting the server if err occurs than log and exit if no err occurs log the address
app.listen({
  port : port
}, (err,address) => {
  if (err) {
    app.log.error(err)
    process.exit(1);
  }
  console.log("server running on port : ",address)
})
