<template lang="pug">
b-modal#addNewFoodToMeal(title="Add foods", size="lg", centered, hide-footer)
  SearchBar(@on-submit="onSubmitSearch")
  div(v-for="(food, index) in foods", :key="index")
    h3 {{ food.name }}
    b-table(
      striped,
      hover,
      :items="food.measures",
      responsive,
      outlined,
      :fields="['measureName', 'grams', 'carbohydrates', 'protein', 'fat', 'calories', 'add']"
    )
      template(#cell(add)="data")
        b-button(@click="addFood(data.item)", variant="success") add
</template>

<script>
import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export default {
  data () {
    return {
      foods: []
    }
  },

  async fetch () {
    await this.fetchFoods()
  },

  methods: {
    async fetchFoods (search = '', pagination = 1) {
      const response = await this.$usersService.getFoods(search, pagination)

      this.foods = response.data.foods.map((food) => {
        const { carbohydrates, protein, fat, idFood, name: foodName } = food

        const baseMeasures = {
          data: {
            idFood
          },
          foodName,
          measureName: 'gr',
          grams: 100,
          idFood,
          carbohydrates,
          protein,
          fat,
          quantity: 0,
          calories: calculateCalories(carbohydrates, protein, fat)
        }

        let measures = [baseMeasures]

        if (food.items) {
          food.items.forEach((measure) => {
            const { measureName, idMeasure, grams } = measure

            let newMeasure = {
              data: {
                idFood,
                idMeasure
              },
              foodName,
              idMeasure,
              measureName,
              grams,
              quantity: 0,
              carbohydrates: (food.carbohydrates / 100) * measure.grams,
              protein: (food.protein / 100) * measure.grams,
              fat: (food.fat / 100) * measure.grams
            }

            newMeasure = {
              ...newMeasure,
              calories: calculateCalories(
                newMeasure.carbohydrates,
                newMeasure.protein,
                newMeasure.fat
              )
            }

            measures = [...measures, newMeasure]
          })
        }

        const row = {
          idFood: food.idFood,
          name: food.name,
          measures
        }

        return row
      })
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
