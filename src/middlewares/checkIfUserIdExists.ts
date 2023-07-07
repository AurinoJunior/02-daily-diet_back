import { FastifyRequest, FastifyReply } from 'fastify'

export async function checkIfUserIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.cookies.userId

  if (!userId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }
}
