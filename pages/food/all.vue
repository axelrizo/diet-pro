<template lang="pug">
b-container.pt-5
  PageFoodFoodNameCreateFoodModal
  b-form.mt-5.d-flex
    b-form-input.w-100(placeholder="Search")
    b-button.ml-2(variant="success", type="submit") Search
  b-button.mt-4(v-b-modal.newFoodModal, block, size="lg", variant="success") Add new food
  .mt-4(v-if="foods.length > 0")
    BaseIterableCollapse.mt-3(v-for="(food, index) in foods", :key="index")
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
            b-table(striped, hover, :items="items", responsive, outlined)
        b-row.m-2
          b-col
            b-button(block, variant="danger") Delete
          b-col
            b-button(block, variant="secondary") Details/Edit
</template>

<script>
// import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export default {
  data () {
    return {
      foods: [
        {
          name: 'Apple',
          carbohydrates: 50,
          protein: 50,
          fat: 50,
          calories: 1000
        }
      ],
      items: [
        {
          quantity: 100,
          measure: 'gr',
          measure_to_grams: 100,
          carbohydrates: 100,
          protein: 95,
          fat: 15,
          calories: 1000
        },
        {
          quantity: 1,
          measure: 'glass',
          measure_to_grams: 50,
          carbohydrates: 100,
          protein: 95,
          fat: 15,
          calories: 1000
        },
        {
          quantity: 1,
          measure: 'cup',
          measure_to_grams: 30,
          carbohydrates: 100,
          protein: 95,
          fat: 15,
          calories: 1000
        },
        {
          quantity: 1,
          measure: 'pza',
          measure_to_grams: 150,
          carbohydrates: 100,
          protein: 95,
          fat: 15,
          calories: 1000
        }
      ]
    }
  }
}
</script>
