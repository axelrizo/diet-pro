<template lang="pug">
b-container.mt-5
  SearchBar(@on-submit="onSubmitSearch")
  MealCreateModal(ref="mealCreateModal" @on-submit="$fetch")
  b-button.mt-4(v-b-modal.createMealModal, block, size="lg", variant="success") Add new meal
  MealCollapseDetails(
    @on-delete="$fetch",
    v-for="meal in meals",
    :key="meal.idMeal",
    :meal="meal"
  )
</template>

<script>
import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export default {
  data () {
    return {
      meals: []
    }
  },

  async fetch () {
    this.meals = await this.fetchMeals()
  },

  methods: {
    async fetchMeals (search = '', pagination = 1) {
      const BASE_MEASURE = 'gr'
      const response = await this.$usersService.getMeals(search, pagination)
      let meals = response.data.meals

      meals = meals.map((meal) => {
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

        // table to show the info of every meal
        const foodsTable = meal.foods.map((food) => {
          let row = {
            foodName: food.name,
            quantity: food.quantity,
            measure: food.measure ? food.measure.name : BASE_MEASURE,
            totalGrams: food.measure
              ? food.measure.quantity * food.quantity
              : food.quantity
          }
          row = {
            ...row,
            carbohydrates: (food.carbohydrates / 100) * row.totalGrams,
            protein: (food.protein / 100) * row.totalGrams,
            fat: (food.fat / 100) * row.totalGrams
          }
          row = {
            ...row,
            calories: calculateCalories(
              row.carbohydrates,
              row.protein,
              row.fat
            )
          }
          return row
        })

        const calories = calculateCalories(carbohydrates, protein, fat)
        return { carbohydrates, protein, fat, calories, foodsTable, ...meal }
      })

      return meals
    },

    async onSubmitSearch (form) {
      this.meals = await this.fetchMeals(form.search)
    }
  }
}
</script>
