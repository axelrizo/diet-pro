<template lang="pug">
BaseCollapse.mt-3
  template(#button)
    b-button(block, variant="primary")
      b-row
        b-col.px-1.d-flex.align-items-center.justify-content-center(cols="4") {{ meal.name }}
        b-col(cols="8")
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
  template(#content)
    b-row.m-2
      b-col
        b-table(
          striped,
          hover,
          :items="meal.foodsTable",
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
          foodsTable: [
            {
              foodName: 'default',
              quantity: 0,
              measure: 'default',
              totalGrams: 0,
              carbohydrates: 0,
              protein: 0,
              fat: 0,
              calories: 0
            }
          ],
          foods: []
        }
      }
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
