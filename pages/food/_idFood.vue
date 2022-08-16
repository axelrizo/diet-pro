<template lang="pug">
b-container.py-5
  PageFoodIdFoodCreateFoodMeasureModal
  BaseFoodForm(:foodData="foodData" @onSubmitFoodForm="onSubmit" )
  PageFoodIdFoodMeasuresTable.mt-4
  b-button(variant="success", v-b-modal.newFoodMeasureModal block size="lg").mt-4 Add new measure
</template>

<script>
export default {
  data () {
    return {
      foodData: {
        foodName: 'testfood',
        foodQuantity: 100,
        foodCarbohydrates: 150,
        foodProtein: 150,
        foodFat: 150
      }
    }
  },

  methods: {
    onSubmit (payload) {
    }
  }
}
</script>
