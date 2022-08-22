<template lang="pug">
b-container.py-5
  PageFoodIdFoodCreateFoodMeasureModal(@onSubmitMeasureModal="onSubmitMeasureModal")
  PageFoodIdFoodCreateFoodMeasureModal(@onSubmitMeasureModal="onSubmitMeasureModal" :updateModal="true")
  PageFoodIdFoodUpdateForm(:food="food")
  PageFoodIdFoodMeasuresTable(:measures="food.items").mt-4
  b-button.mt-4(
    variant="success",
    v-b-modal.createFoodMeasureModal,
    block,
    size="lg"
  ) Add new measure
</template>

<script>
import { handleFoodArrays } from '@/helpers/handleArrays'

export default {
  data () {
    return {
      food: {}
    }
  },

  async fetch () {
    this.food = await this.fetchInfo()
  },

  methods: {
    onSubmitMeasureModal () {
      // fetch
    },

    async fetchInfo () {
      const response = await this.$userService.getFood(this.$route.params.idFood)
      return handleFoodArrays([response.data.food])[0]
    }
  }
}
</script>
