<template lang="pug">
b-container.pt-5
  PageFoodAllCreateFoodModal(@onSubmit="onSubmit")
  BaseSearchBar(@onSubmitSearch="onSubmitSearch")
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
    const BASE_PAGE_TO_SHOW = 1
    const EMPTY_SEARCH = ''
    await this.fetchResults(EMPTY_SEARCH, BASE_PAGE_TO_SHOW)
  },

  methods: {
    onSubmitSearch (form) {
      const BASE_PAGE_TO_SHOW = 1
      this.fetchResults(form.search, BASE_PAGE_TO_SHOW)
    },

    onSubmit () {
      const BASE_PAGE_TO_SHOW = 1
      const EMPTY_SEARCH = ''
      this.fetchResults(EMPTY_SEARCH, BASE_PAGE_TO_SHOW)
    },

    async fetchResults (search, pagination) {
      const response = await this.$userService.getFoods(search, pagination)
      this.foods = handleFoodArrays(response.data.foods)
    }
  }
}
</script>
