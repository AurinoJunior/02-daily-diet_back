import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { userRoute } from './routes/user'
import { mealRoute } from './routes/meal'

const app = fastify()

app.register(cookie)
app.register(userRoute, {
  prefix: 'user',
})
app.register(mealRoute, {
  prefix: 'meal',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server Running! 🔥', 3333)
  })
