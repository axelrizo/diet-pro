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
            b-col.px-1(cols="3") {{ food.carbohydrates }}#[span.d-none.d-sm-inline gr]
            b-col.px-1(cols="3") {{ food.protein }}#[span.d-none.d-sm-inline gr]
            b-col.px-1(cols="3") {{ food.fat }}#[span.d-none.d-sm-inline gr]
            b-col.px-1(cols="3") {{ food.calories }}#[span.d-none.d-sm-inline kcal]
  template(#content)
    b-row.m-2
      b-col
        FoodMeasuresTable(
          :measures="food.items",
          :fields="['quantity',{key:'name', label:'Measure Name'}, 'grams', 'carbohydrates', 'protein', 'fat', 'calories']"
        )
    b-row.m-2
      b-col
        b-button(block, variant="danger", @click="onDelete()") Delete
      b-col
        b-button(block, variant="secondary", :to="`foods/${food.idFood}`") Details/Edit
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'

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

  methods: {
    async onDelete () {
      try {
        const response = await this.$foodsService
          .deleteFood(this.food.idFood)
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
