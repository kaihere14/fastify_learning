import fastifyPlugin from "fastify-plugin";
import fastifyMongodb from "@fastify/mongodb";

const dbPlugin = fastifyPlugin(async (fastify) => {
  fastify.register(fastifyMongodb, {
    url: "mongodb://localhost:27017/test_database",
  })

});

export default dbPlugin;
