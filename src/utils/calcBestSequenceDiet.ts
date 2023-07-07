interface IMealParam {
  id: string
  userId: string
  name: string
  description?: string | undefined
  mealHour: string
  isInDiet: boolean
  created_at: string
}

export function calcBestSquenceDiet(meals: IMealParam[]): number {
  const listSequence: number[] = []
  let countSequence: number = 0

  const listIsInDiet = meals.map(({ isInDiet }) => isInDiet)

  listIsInDiet.forEach((item, index) => {
    if (item) {
      countSequence++
    } else {
      listSequence.push(countSequence)
      countSequence = 0
    }

    if (listIsInDiet.length - 1 === index) {
      listSequence.push(countSequence)
    }
  })

  return Math.max(...listSequence)
}
