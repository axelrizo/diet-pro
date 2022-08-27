<template lang="pug">
BaseIterableCollapse.mt-3
  template(#button)
    b-button(block, variant="primary")
      b-row
        b-col.px-1.d-flex.align-items-center.justify-content-center(
          cols="4"
        ) {{ food.name }}
        b-col(cols="8")
          b-row
            b-col.px-1(cols="3") Carbs
            b-col.px-1(cols="3") Prot
            b-col.px-1(cols="3") Fat
            b-col.px-1(cols="3") Cal
          b-row
            b-col.px-1(cols="3") {{food.carbohydrates}}#[span.d-none.d-sm-inline gr]
            b-col.px-1(cols="3") {{food.protein}}#[span.d-none.d-sm-inline gr]
            b-col.px-1(cols="3") {{food.fat}}#[span.d-none.d-sm-inline gr]
            b-col.px-1(cols="3") {{food.calories}}#[span.d-none.d-sm-inline kcal]
  template(#content)
    b-row.m-2
      b-col
        b-table(striped, hover, :items="food.items", responsive, outlined)
    b-row.m-2
      b-col
        b-button(block, variant="danger" @click="onDelete()") Delete
      b-col
        b-button(block, variant="secondary" :to="`${food.idFood}`") Details/Edit
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'

export default {
  mixins: [mixinHandleNotification],

  props: {
    food: {
      type: Object,
      default () {
        return {
          name: 'Apple',
          carbohydrates: 50,
          protein: 50,
          fat: 50,
          calories: 1000,
          idFood: 15,
          items: [
            {
              quantity: 100,
              idMeasure: 0,
              measureName: 'gr',
              grams: 100,
              carbohydrates: 100,
              protein: 95,
              fat: 15,
              calories: 1000
            }
          ]
        }
      }
    }
  },

  methods: {
    async onDelete () {
      try {
        const response = await this.$foodsService.deleteFood(this.food.idFood)

        this.$emit('onDelete')

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
