<template lang="pug">
b-form(@submit.prevent="onSubmit")
  b-form-group(
    label-cols="5",
    label-cols-lg="2",
    label="Name:",
    label-for="foodName"
  )
    b-input-group
      b-form-input#foodName(v-model="form.foodName")
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
        v-model="form.foodQuantity",
        readonly
      )
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
        v-model="form.foodCarbohydrates"
      )
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
        v-model="form.foodProtein"
      )
  b-form-group(
    label-cols="5",
    label-cols-lg="2",
    label="Fat:",
    label-for="foodFat"
  )
    b-input-group(append="gr")
      b-form-input#foodFat(type="number", step="0.1", v-model="form.foodFat")
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
    foodData: {
      type: Object,
      default: () => {
        return {
          foodName: '',
          foodQuantity: 100,
          foodCarbohydrates: 0,
          foodProtein: 0,
          foodFat: 0
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
      form: {
        foodName: this.foodData.foodName,
        foodQuantity: this.foodData.foodQuantity,
        foodCarbohydrates: this.foodData.foodCarbohydrates,
        foodProtein: this.foodData.foodProtein,
        foodFat: this.foodData.foodFat
      }
    }
  },

  computed: {
    foodCalories () {
      return calculateCalories(
        this.form.foodCarbohydrates,
        this.form.foodProtein,
        this.form.foodFat
      )
    }
  },

  methods: {
    onSubmit () {
      this.$emit('onSubmitFoodForm', this.form)
    }
  }
}
</script>
