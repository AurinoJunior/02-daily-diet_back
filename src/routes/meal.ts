import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkIfUserIdExists } from '../middlewares/checkIfUserIdExists'

export async function mealRoute(app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: [checkIfUserIdExists],
    },
    async (request, reply) => {
      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string().default(''),
        mealHour: z.string(),
        isInDiet: z.boolean(),
      })

      const { name, description, isInDiet, mealHour } =
        createMealBodySchema.parse(request.body)

      const { userId } = request.cookies

      const newMeal = {
        id: randomUUID(),
        name,
        description,
        isInDiet,
        mealHour,
        userId,
      }

      await knex('meal').insert(newMeal)

      return reply.status(201).send()
    },
  )
}
