// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    meal: {
      id: string
      userId: string
      name: string
      description?: string
      mealHour: string
      isInDiet: boolean
      created_at: string
    }
    user: {
      id: string
      name: string
    }
  }
}
