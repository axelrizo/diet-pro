<template lang="pug">
BaseCollapse.mt-3
  template(#button)
    b-button(block, variant="primary")
      b-row
        b-col.px-1.d-flex.align-items-center.justify-content-center(cols="4") {{ food.name }}
        b-col(cols="8")
          b-row
            b-col.px-1(cols="3") Carbs
            b-col.px-1(cols="3") Prot
            b-col.px-1(cols="3") Fat
            b-col.px-1(cols="3") Cal
          b-row
            b-col.px-1(cols="3") {{ food.nutritionalInformation.carbohydrates }}#[span.d-none.d-sm-inline gr]
            b-col.px-1(cols="3") {{ food.nutritionalInformation.protein }}#[span.d-none.d-sm-inline gr]
            b-col.px-1(cols="3") {{ food.nutritionalInformation.fat }}#[span.d-none.d-sm-inline gr]
            b-col.px-1(cols="3") {{ computedCalories }}#[span.d-none.d-sm-inline kcal]
  template(#content)
    b-row.m-2
      b-col
        FoodMeasuresTable(
          :measures="computedMeasures",
          :fields="['quantity', { key: 'name', label: 'Measure Name' }, 'grams', 'carbohydrates', 'protein', 'fat', 'calories']"
        )
    b-row.m-2
      b-col
        b-button(block, variant="danger", @click="onDelete()") Delete
      b-col
        b-button(block, variant="secondary", :to="`foods/${food.idFood}`") Details/Edit
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'
import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export default {
  mixins: [mixinHandleNotification],

  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  computed: {
    computedCalories () {
      return calculateCalories(
        this.food.nutritionalInformation.carbohydrates,
        this.food.nutritionalInformation.protein,
        this.food.nutritionalInformation.fat
      )
    },

    computedMeasures () {
      const returnedArray = this.food.measures
        .map((measure) => {
          const carbohydrates = (this.food.nutritionalInformation.carbohydrates / 100) * measure.grams
          const protein = (this.food.nutritionalInformation.protein / 100) * measure.grams
          const fat = (this.food.nutritionalInformation.fat / 100) * measure.grams
          const calories = calculateCalories(carbohydrates, protein, fat)
          return { ...measure, carbohydrates, protein, fat, calories }
        })
      return returnedArray
    }
  },

  methods: {
    async onDelete () {
      try {
        const response = await this.$foodsService
          .deleteFood(this.food.id)
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
