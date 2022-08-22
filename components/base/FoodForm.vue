<template lang="pug">
b-form(@submit.prevent="onSubmit")
  //- name
  b-form-group(
    label-cols="5",
    label-cols-lg="2",
    label="Name:",
    label-for="foodName"
  )
    b-input-group
      b-form-input#foodName(v-model="food.name")
  //- quantity
  b-form-group(
    label-cols="5",
    label-cols-lg="2",
    label="Quantity:",
    label-for="foodQuantity",
    :description="foodQuantityWarning ? 'After you will add more measures, now we need the base measure (100gr).' : 'Base measure, below you can add new measures'"
  )
    b-input-group(append="gr")
      b-form-input#foodQuantity(
        type="number",
        v-model="quantity",
        readonly
      )
  //- carbohydrates
  b-form-group(
    label-cols="5",
    label-cols-lg="2",
    label="Carbohydrates:",
    label-for="foodCarbohydrates"
  )
    b-input-group(append="gr")
      b-form-input#foodCarbohydrates(
        type="number",
        step="0.1",
        v-model="food.carbohydrates"
      )
  //- protein
  b-form-group(
    label-cols="5",
    label-cols-lg="2",
    label="Protein:",
    label-for="foodProtein"
  )
    b-input-group(append="gr")
      b-form-input#foodProtein(
        type="number",
        step="0.1",
        v-model="food.protein"
      )
  //- fat
  b-form-group(
    label-cols="5",
    label-cols-lg="2",
    label="Fat:",
    label-for="foodFat"
  )
    b-input-group(append="gr")
      b-form-input#foodFat(type="number", step="0.1", v-model="food.fat")
  //- calories
  b-form-group(
    label-cols="5",
    label-cols-lg="2",
    label="Calories:",
    label-for="foodCalories"
  )
    b-input-group(append="kcal")
      b-form-input#foodCalories(
        type="number",
        v-model="foodCalories",
        readonly
      )
  b-button.ml-auto.d-block(type="submit", variant="success") Save
</template>

<script>
import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export default {
  props: {
    food: {
      type: Object,
      default () {
        return {
          name: '',
          carbohydrates: 0,
          protein: 0,
          fat: 0
        }
      }
    },

    foodQuantityWarning: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      quantity: 100
    }
  },

  computed: {
    foodCalories () {
      return calculateCalories(
        this.food.carbohydrates,
        this.food.protein,
        this.food.fat
      )
    }
  },

  methods: {
    onSubmit () {
      this.$emit('onSubmitFoodForm', this.food)
    }
  }
}
</script>
