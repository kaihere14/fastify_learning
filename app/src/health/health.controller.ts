
import { FastifyReply, FastifyRequest } from "fastify"

export const healthController = (request:FastifyRequest , reply:FastifyReply) => {
  reply.code(200).send({message:"server is up and running healthy"})
}
