import type { FastifyReply, FastifyRequest } from "fastify"

export interface AnimalParams {
  animal: string
}

export interface AnimalBody {
  animal: string
}

const getCollection = (request:FastifyRequest) => {
  const collection = request.server.mongo.db?.collection('test_collection')
  if (!collection) {
    throw new Error('MongoDB database not configured')
  }
  return collection
}

export const getAnimals = async (request:FastifyRequest, reply:FastifyReply) => {
  const result = await getCollection(request).find().toArray()
  if (result.length === 0) {
    return reply.code(404).send({ message: 'No documents found' })
  }
  return result
}

export const getAnimal = async (request:FastifyRequest<{ Params: AnimalParams }>, reply:FastifyReply) => {
  const result = await getCollection(request).findOne({ animal: request.params.animal })
  if (!result) {
    return reply.code(404).send({ message: 'Animal not found' })
  }
  return result
}

export const createAnimal = async (request:FastifyRequest<{ Body: AnimalBody }>, _reply:FastifyReply) => {
  const result = await getCollection(request).insertOne({ animal: request.body.animal })
  return result
}
