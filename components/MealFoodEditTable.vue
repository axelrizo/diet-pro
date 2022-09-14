<template lang="pug">
b-table-simple(v-if="foods.length > 0", striped, hover, responsive, outlined)
  b-thead
    b-tr
      b-th Food Name
      b-th Quantity
      b-th Measure Name
      b-th Grams
      b-th Carbohydrates
      b-th Protein
      b-th Fat
      b-th Calories
      b-th Remove
  b-tbody
    MealFoodEditTableRow(
      v-for="(food, index) in computedFoods",
      :key="index",
      :food="food",
      :index="computedFoods.indexOf(food)",
      @remove-food="$emit('remove-food', index)",
      @on-input="onInput"
    )
    b-tr
      b-td(colspan="4") TOTAL
      b-td.font-weight-bold {{ computedMacrosTotals.carbohydrates }}
      b-td.font-weight-bold {{ computedMacrosTotals.protein }}
      b-td.font-weight-bold {{ computedMacrosTotals.fat }}
      b-td.font-weight-bold(colspan="2") {{ computedMacrosTotals.calories }}
</template>

<script>
import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export default {
  props: {
    foods: {
      type: Array,
      default () {
        return []
      }
    }
  },

  computed: {
    computedFoods () {
      return this.foods.map((food) => {
        const {
          grams,
          quantity,
          carbohydrates,
          protein,
          fat,
          foodName,
          name: measureName
        } = food

        const newFood = {
          foodName,
          quantity,
          measureName
        }

        if (food.idFood && !food.idMeasure) {
          newFood.grams = (grams / 100) * quantity
          newFood.carbohydrates = ((carbohydrates / 100) * quantity).toFixed()
          newFood.protein = ((protein / 100) * quantity).toFixed()
          newFood.fat = ((fat / 100) * quantity).toFixed()
          newFood.calories = calculateCalories(
            newFood.carbohydrates,
            newFood.protein,
            newFood.fat
          )

          return newFood
        }

        newFood.grams = grams * quantity
        newFood.carbohydrates = (carbohydrates * quantity).toFixed()
        newFood.protein = (protein * quantity).toFixed()
        newFood.fat = (fat * quantity).toFixed()
        newFood.calories = calculateCalories(
          newFood.carbohydrates,
          newFood.protein,
          newFood.fat
        )

        return newFood
      })
    },

    computedMacrosTotals () {
      return this.computedFoods.reduce((total, current) => {
        total.carbohydrates += parseInt(current.carbohydrates)
        total.protein += parseInt(current.protein)
        total.fat += parseInt(current.fat)
        total.calories += parseInt(current.calories)
        return total
      }, { carbohydrates: 0, protein: 0, fat: 0, calories: 0 })
    }
  },

  methods: {
    onInput ({ event, index }) {
      this.$emit('on-input', { event, index })
    }
  }
}
</script>
