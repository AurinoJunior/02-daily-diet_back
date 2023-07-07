import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkIfUserIdExists } from '../middlewares/checkIfUserIdExists'

export async function userRoute(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
    })

    const { name } = createUserBodySchema.parse(request.body)

    const userId = randomUUID()

    reply.cookie('userId', userId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    const newUser = {
      id: userId,
      name,
    }

    await knex('user').insert(newUser)

    return reply.status(201).send()
  })

  app.get(
    '/',
    {
      preHandler: [checkIfUserIdExists],
    },
    async (request, reply) => {
      const { userId } = request.cookies

      const userResult = await knex
        .table('user')
        .innerJoin('meal', 'user.id', '=', 'meal.userId')

      return reply.status(200).send({
        userResult,
      })
    },
  )
}
