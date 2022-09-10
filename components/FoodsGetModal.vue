<template lang="pug">
b-modal#addNewFoodToMeal(title="Add foods", size="lg", centered, hide-footer)
  SearchBar(@on-submit="onSubmitSearch")
  div(v-for="(food, index) in foodsWithPropertyDisabled", :key="index")
    h3 {{ food.name }}
    b-table(
      striped,
      hover,
      :items="food.items",
      responsive,
      outlined,
      :fields="['measureName', 'quantity', 'carbohydrates', 'protein', 'fat', 'calories', 'add']"
    )
      template(#cell(add)="data")
        b-button(
          @click="addFood(data.item.measureCopy)",
          variant="success",
          :disabled="data.item.disable"
        ) add
</template>

<script>
import { handleFoodArrays } from '@/helpers/handleArrays'

export default {
  props: {
    selectedFoods: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      foods: []
    }
  },

  async fetch () {
    this.foods = await this.fetchFoods()
  },

  computed: {
    foodsWithPropertyDisabled () {
      return this.foods
        .map((food) => {
          food.items = food.items
            .map((measure) => {
              return {
                measureCopy: measure,
                ...measure,
                disable: this.selectedFoods.some(someFood => JSON.stringify(someFood) === JSON.stringify(measure.measureCopy))
              }
            })
          return food
        })
    }
  },

  methods: {
    async fetchFoods (search = '', pagination = 1) {
      const response = await this.$usersService.getFoods(search, pagination)
      return handleFoodArrays(response.data.foods)
    },

    async onSubmitSearch (form) {
      await this.fetchFoods(form.search)
    },

    addFood (food) {
      this.$emit('add-food', food)
    }
  }
}
</script>
