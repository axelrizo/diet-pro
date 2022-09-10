<template lang="pug">
b-container.mt-5
  SearchBar(@on-submit="onSubmitSearch")
  MealCreateModal(ref="mealCreateModal" @on-submit="$fetch")
  b-button.mt-4(v-b-modal.createMealModal, block, size="lg", variant="success") Add new meal
  MealCollapseDetails(
    v-for="meal in meals",
    :key="meal.idMeal",
    :meal="meal"
    @on-delete="$fetch",
  )
</template>

<script>
import { handleMealArrays } from '@/helpers/handleArrays'

export default {
  data () {
    return {
      meals: []
    }
  },

  async fetch () {
    this.meals = await this.fetchMeals()
  },

  methods: {
    async fetchMeals (search = '', pagination = 1) {
      const response = await this.$usersService.getMeals(search, pagination)
      return handleMealArrays(response.data.meals)
    },

    async onSubmitSearch (form) {
      this.meals = await this.fetchMeals(form.search)
    }
  }
}
</script>
