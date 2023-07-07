import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkIfUserIdExists } from '../middlewares/checkIfUserIdExists'
import { calcBestSquenceDiet } from '../utils/calcBestSequenceDiet'

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

      const meals = await knex.table('meal').where('userId', userId).select('*')
      const user = await knex
        .table('user')
        .where('id', userId)
        .select('*')
        .first()

      return reply.status(200).send({
        user,
        meals,
      })
    },
  )

  app.get(
    '/metrics',
    {
      preHandler: [checkIfUserIdExists],
    },
    async (request, reply) => {
      const { userId } = request.cookies

      const meals = await knex.table('meal').where('userId', userId).select('*')
      const user = await knex
        .table('user')
        .where('id', userId)
        .select('*')
        .first()

      const mealsInDiet = meals.filter(({ isInDiet }) => isInDiet)

      return reply.status(200).send({
        user,
        metrics: {
          totalMeals: meals.length,
          inDiet: mealsInDiet.length,
          offTheDiet: meals.length - mealsInDiet.length,
          bestSequence: calcBestSquenceDiet(meals),
        },
      })
    },
  )
}
