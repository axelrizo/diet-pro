import { calculateCalories } from '@/helpers/handleCaloriesCalc'

const handleFoodArrays = (array) => {
  const returnedArray = array
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

  return returnedArray
}

export {
  handleFoodArrays
}
