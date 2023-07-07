import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkIfUserIdExists } from '../middlewares/checkIfUserIdExists'
import { checkIfUserIsAuthorized } from '../middlewares/checkIfUserIsAuthorized'

export async function mealRoute(app: FastifyInstance) {
  app.addHook('preHandler', checkIfUserIdExists)
  app.addHook('preHandler', checkIfUserIsAuthorized)

  app.post('/', async (request, reply) => {
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
  })

  app.patch('/:id', async (request, reply) => {
    const updateMealBodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      mealHour: z.string().optional(),
      isInDiet: z.boolean().optional(),
    })

    const { name, description, isInDiet, mealHour } =
      updateMealBodySchema.parse(request.body)

    const getMealParamSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getMealParamSchema.parse(request.params)

    const updatedMeal = {
      name,
      description,
      isInDiet,
      mealHour,
    }

    await knex('meal').where('id', id).update(updatedMeal)

    return reply.status(200).send()
  })

  app.delete('/:id', async (request, reply) => {
    const getMealParamSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getMealParamSchema.parse(request.params)

    await knex('meal').where('id', id).delete()

    return reply.status(204).send()
  })

  app.get('/:id', async (request, reply) => {
    const getMealParamSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getMealParamSchema.parse(request.params)

    const resultMeal = await knex('meal').where('id', id).select('*').first()

    return reply.status(200).send({
      meal: resultMeal,
    })
  })
}
