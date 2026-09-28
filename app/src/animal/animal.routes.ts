import type { FastifyInstance, FastifyPluginOptions } from "fastify"
import { createAnimal, getAnimal, getAnimals, type AnimalBody, type AnimalParams } from "./animal.controller"

const animalBodyJsonSchema = {
  type: 'object',
  required: ['animal'],
  properties: {
    animal: { type: 'string' },
  },
}

const schema = {
  body: animalBodyJsonSchema,
}

export async function animalRoutes (fastify:FastifyInstance, _options:FastifyPluginOptions) {
  fastify.get('/animals', getAnimals)
  fastify.get<{ Params: AnimalParams }>('/animals/:animal', getAnimal)
  fastify.post<{ Body: AnimalBody }>('/animals', { schema }, createAnimal)
}
