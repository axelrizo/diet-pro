<template lang="pug">
b-form(@submit.prevent="$emit('on-submit', form)")
  //- name
  b-form-group(label-cols="5", label-cols-lg="2", label="Name:")
    b-form-input(v-model="form.name")
  //- quantity
  b-form-group(
    label-cols="5",
    label-cols-lg="2",
    label="Quantity:",
    :description="foodQuantityWarning ? 'After you will add more measures, now we need the base measure (100gr).' : 'Base measure, below you can add new measures'"
  )
    b-input-group(append="gr")
      b-form-input(type="number", value="100", readonly)
  //- carbohydrates
  b-form-group(label-cols="5", label-cols-lg="2", label="Carbohydrates:")
    b-input-group(append="gr")
      b-form-input(type="number", step="0.1", v-model="form.carbohydrates")
  //- protein
  b-form-group(label-cols="5", label-cols-lg="2", label="Protein:")
    b-input-group(append="gr")
      b-form-input(type="number", step="0.1", v-model="form.protein")
  //- fat
  b-form-group(label-cols="5", label-cols-lg="2", label="Fat:")
    b-input-group(append="gr")
      b-form-input(type="number", step="0.1", v-model="form.fat")
  //- calories
  b-form-group(label-cols="5", label-cols-lg="2", label="Calories:")
    b-input-group(append="kcal")
      b-form-input(type="number", :value="foodCalories", readonly)
  slot
</template>

<script>
import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export default {
  props: {
    food: {
      type: Object,
      default () { return {} }
    },

    foodQuantityWarning: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      form: {
        name: this.food.name,
        carbohydrates: this.food.nutritionalInformation.carbohydrates,
        protein: this.food.nutritionalInformation.protein,
        fat: this.food.nutritionalInformation.fat
      }
    }
  },

  computed: {
    foodCalories () {
      return calculateCalories(
        this.form.carbohydrates,
        this.form.protein,
        this.form.fat
      )
    }
  },

  watch: {
    food: {
      deep: true,
      handler (newValue) {
        this.form.name = newValue.name
        this.form.carbohydrates = newValue.nutritionalInformation.carbohydrates
        this.form.protein = newValue.nutritionalInformation.protein
        this.form.fat = newValue.nutritionalInformation.fat
      }
    }
  }
}
</script>
