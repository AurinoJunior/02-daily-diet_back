import { FastifyRequest, FastifyReply } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function checkIfUserIsAuthorized(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getMealParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { userId } = request.cookies
  const { id } = getMealParamSchema.parse(request.params)

  const user = await knex('user').where('id', userId).select('*')
  const meal = await knex('meal').where('id', id).select('*').first()

  if (!user || meal?.userId !== userId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }
}
