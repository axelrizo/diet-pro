<template lang="pug">
b-table(striped hover outlined :items="arrayWithCalories" responsive)
</template>

<script>
import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export default {
  data () {
    return {
      items: [
        { quantity: 40, measure_name: 'Dickerson', measure_to_grams: 'Macdonald', carbohydrates: 100, protein: 100, fat: 100 }
      ]
    }
  },

  computed: {
    arrayWithCalories () {
      return this.items.map((item) => {
        item.calories = calculateCalories(item.carbohydrates, item.protein, item.fat)
        return item
      })
    }
  }
}
</script>
