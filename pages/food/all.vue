<template lang="pug">
b-container.pt-5
  PageFoodAllCreateFoodModal
  PageFoodAllSearchBar
  b-button.mt-4(v-b-modal.createFoodModal, block, size="lg", variant="success") Add new food
  .mt-4(v-if="foods.length > 0")
    PageFoodAllCollapseElements(
      v-for="(food, index) in foods",
      :food="food",
      :key="index"
    )
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
          calories: 1000,
          idFood: 15,
          items: [
            {
              idMeasure: 1,
              quantity: 100,
              measure: 'gr',
              measure_to_grams: 100,
              carbohydrates: 100,
              protein: 95,
              fat: 15,
              calories: 1000
            }
          ]
        }
      ]
    }
  }
}
</script>
