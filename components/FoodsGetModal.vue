<template lang="pug">
b-modal#addNewFoodToMeal(title="Add foods", size="lg", centered, hide-footer)
  SearchBar(@on-submit="onSubmitFoodSearch()")
  div(v-for="(food, index) in foods", :key="index")
    h3 {{ food.name }}
    b-table(
      striped,
      hover,
      :items="food.measures",
      responsive,
      outlined,
      :fields="['measureName', 'grams', 'carbohydrates', 'protein', 'fat', 'calories', 'quantity', 'add']"
    )
      template(#cell(quantity)="data")
        b-input(
          type="number",
          @input="data.item.value = parseInt($event)",
          min="1",
          value="0"
        )
      template(#cell(add)="data")
        b-button(@click="addFoodToCreateMeal(data.item)", variant="success") add
</template>

<script>
import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export default {
  data () {
    return {
      foods: []
    }
  },

  methods: {
    async fetchFoods (search = '', pagination = 1) {
      const response = await this.$usersService.getFoods(search, pagination)
      this.foods = response.data.foods.map((food) => {
        const { carbohydrates, protein, fat, idFood, name: foodName } = food
        const baseMeasures = {
          foodName,
          measureName: 'gr',
          grams: 100,
          idFood,
          carbohydrates,
          protein,
          fat,
          calories: calculateCalories(carbohydrates, protein, fat),
          quantity: '',
          add: ''
        }

        let measures = [baseMeasures]

        if (food.items) {
          food.items.forEach((measure) => {
            const { measureName, idMeasure, grams } = measure
            let newMeasure = {
              foodName,
              idMeasure,
              measureName,
              grams,
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
              ),
              quantity: '',
              add: ''
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
    }
  }
}
</script>
