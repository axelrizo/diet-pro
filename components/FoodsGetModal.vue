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
      :fields="['quantity', { key:'name', label:'Measure Name' }, 'grams', 'carbohydrates', 'protein', 'fat', 'calories', 'add']"
    )
      template(#cell(add)="data")
        b-button(
          @click="addFood(data.item)",
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
      return this.foods.map((food) => {
        const newItems = food.items.map((measure) => {
          return {
            ...measure,
            disable: this.selectedFoods.some(someFood => someFood.idFood === measure.idFood)
          }
        })
        return { ...food, items: newItems }
      })
    }
  },

  methods: {
    async fetchFoods (search = '', pagination = 1) {
      const response = await this.$usersService.getFoods(search, pagination)
      return handleFoodArrays(response.data.foods)
    },

    async onSubmitSearch (form) {
      this.foods = await this.fetchFoods(form.search)
    },

    addFood (item) {
      const newItem = { ...item }
      delete newItem.disable
      let measureFound = null

      this.foods.forEach((food) => {
        const selectedItem = food.items
          .find(({ idMeasure, idFood }) => {
            if (newItem.idMeasure) { return newItem.idMeasure === idMeasure }
            return newItem.idFood === idFood
          })

        if (selectedItem !== undefined) {
          selectedItem.foodName = food.name
          measureFound = selectedItem
        }
      })

      this.$emit('add-food', measureFound)
    }
  }
}
</script>
