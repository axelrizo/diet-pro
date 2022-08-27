<template lang="pug">
b-container
  .mt-4(v-if="meals.length > 0")
    //- PageMealAllCollapseElements()
</template>

<script>
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
      return response.data.meals
    }
  }
}
</script>
