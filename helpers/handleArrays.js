import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export const handleFoodArrays = (array) => {
  return array
    .map((food) => {
      const baseMeasureItem = { quantity: 100, measureName: 'gr', grams: 100 }

      food.calories = calculateCalories(food.carbohydrates, food.protein, food.fat)

      if (food.items) {
        food.items = [baseMeasureItem, ...food.items]
      } else {
        food.items = [baseMeasureItem]
      }

      food.items = food.items
        .map((measure) => {
          const BASE_MEASURE = 100

          measure = {
            ...measure,
            idFood: food.idFood,
            carbohydrates: (measure.grams * food.carbohydrates) / BASE_MEASURE,
            fat: (measure.grams * food.fat) / BASE_MEASURE,
            protein: (measure.grams * food.protein) / BASE_MEASURE
          }
          measure = {
            ...measure,
            calories: calculateCalories(measure.carbohydrates, measure.protein, measure.fat)
          }
          return measure
        })
      return food
    })
}

export const handleMealArrays = (array) => {
  return array.map((meal) => {
    if (meal.idFood === null) {
      return meal
    }

    // get an object sum of every food macro nutrient cal if we had measures or not
    const { carbohydrates, protein, fat } = meal.foods.reduce(
      (accumulate, current) => {
        if (!current.measure) {
          accumulate.carbohydrates +=
                (current.carbohydrates / 100) * current.quantity
          accumulate.protein += (current.protein / 100) * current.quantity
          accumulate.fat += (current.fat / 100) * current.quantity
        } else {
          accumulate.carbohydrates +=
                (current.carbohydrates / 100) *
                (current.measure.quantity * current.quantity)
          accumulate.protein +=
                (current.protein / 100) *
                (current.measure.quantity * current.quantity)
          accumulate.fat +=
                (current.fat / 100) *
                (current.measure.quantity * current.quantity)
        }
        return accumulate
      },
      { carbohydrates: 0, protein: 0, fat: 0 }
    )

    const calories = calculateCalories(carbohydrates, protein, fat)
    return { carbohydrates, protein, fat, calories, ...meal }
  })
}
