<template lang="pug">
BaseCollapse.mt-3
  template(#button)
    b-button(block, variant="primary")
      b-row
        b-col.px-1.d-flex.align-items-center.justify-content-center(cols="4") {{ meal.name }}
        b-col(cols="8", v-if="meal.foods")
          b-row
            b-col.px-1(cols="3") Carbs
            b-col.px-1(cols="3") Prot
            b-col.px-1(cols="3") Fat
            b-col.px-1(cols="3") Cal
          b-row
            b-col.px-1(cols="3") {{ meal.carbohydrates }} #[span.d-none.d-sm-inline gr]
            b-col.px-1(cols="3") {{ meal.protein }} #[span.d-none.d-sm-inline gr]
            b-col.px-1(cols="3") {{ meal.fat }} #[span.d-none.d-sm-inline gr]
            b-col.px-1(cols="3") {{ meal.calories }} #[span.d-none.d-sm-inline kcal]
        b-col(cols="8", v-else) Don't have data yet
  template(#content)
    b-row.m-2
      b-col
        b-table(
          striped,
          hover,
          v-if="meal.foods",
          :items="foodsTable",
          responsive,
          outlined
        )
    b-row.m-2
      b-col
        b-button(block, variant="danger", @click="onDelete(meal.idMeal)") Delete
      b-col
        b-button(block, variant="secondary", :to="`meals/${meal.idMeal}`") Details/Edit
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'
import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export default {
  mixins: [mixinHandleNotification],

  props: {
    meal: {
      type: Object,
      default () {
        return {
          idMeal: 0,
          name: 'default',
          carbohydrates: 0,
          protein: 0,
          fat: 0,
          calories: 0,
          foods: []
        }
      }
    }
  },

  computed: {
    foodsTable () {
      if (!this.meal.foods) { return null }
      return this.meal.foods.map((food) => {
        const BASE_MEASURE = 'gr'

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
          calories: calculateCalories(row.carbohydrates, row.protein, row.fat)
        }
        return row
      })
    }
  },

  methods: {
    async onDelete (id) {
      try {
        const response = await this.$mealsService
          .deleteMeal(id)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$emit('on-delete')

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
