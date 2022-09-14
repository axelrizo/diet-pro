<template lang="pug">
b-container.pt-5
  FoodCreateModal(@on-submit="$fetch")
  SearchBar(@on-submit="onSubmitSearch")
  b-button.mt-4(v-b-modal.createFoodModal, block, size="lg", variant="success") Add new food
  .mt-4(v-if="foods.length > 0")
    FoodCollapseDetails(
      v-for="(food, index) in foods",
      :food="food",
      :key="index"
      @on-delete="$fetch"
    )
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'

const BASE_PAGINATION = 1
const EMPTY_SEARCH = ''

export default {
  mixins: [mixinHandleNotification],

  data () {
    return {
      foods: []
    }
  },

  async fetch () {
    await this.fetchResults()
  },

  methods: {
    onSubmitSearch (form) {
      this.fetchResults(form.search)
    },

    async fetchResults (search = EMPTY_SEARCH, pagination = BASE_PAGINATION) {
      const response = await this.$usersService.getFoods(search, pagination)
      this.foods = response.data.foods
    }
  }
}
</script>
