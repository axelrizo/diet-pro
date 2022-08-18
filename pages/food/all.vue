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
import { mixinHandleNotification } from '@/mixins/handleNotification'
import { handleFoodArrays } from '@/helpers/handleArrays'

export default {
  mixins: [mixinHandleNotification],

  data () {
    return {
      foods: []
    }
  },

  async fetch () {
    try {
      const response = await this.$foodService.getFoods('', 1)
      this.foods = handleFoodArrays(response.data.foods)
    } catch (error) {
      this.mixinHandleNotificationErrorNotification(error)
    }
  }
}
</script>
