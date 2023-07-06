import { FastifyInstance } from 'fastify'

export async function userRoute(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    return reply.status(201).send()
  })
}
