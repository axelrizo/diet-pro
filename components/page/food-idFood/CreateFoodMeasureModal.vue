<template lang="pug">
b-modal#createFoodMeasureModal(
  title="New Food Measure",
  size="lg",
  centered,
  hide-footer
)
  b-form(@submit.prevent="onSubmit")
    h5 Base measure
    PageFoodFoodNameMeasuresTable
    //- measure name
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Measure name:",
      label-for="foodMeasureName"
    )
      b-form-input#foodMeasureName(v-model="form.foodMeasureName")
    //- measure quantity
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Quantity:",
      label-for="foodMeasureQuantity"
    )
      b-input-group(append="gr")
        b-form-input#foodMeasureQuantity(v-model="form.foodMeasureQuantity")
    //- measure carbohydrates
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Carbohydrates:",
      label-for="foodMeasureCarbohydrates"
    )
      b-input-group(append="gr")
        b-form-input#foodMeasureCarbohydrates(
          v-model="computedProperties.carbohydrates",
          readonly
        )
    //- measure protein
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Protein:",
      label-for="foodMeasureProtein"
    )
      b-input-group(append="gr")
        b-form-input#foodMeasureProtein(
          v-model="computedProperties.protein",
          readonly
        )
    //- measure fat
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Fat:",
      label-for="foodMeasureFat"
    )
      b-input-group(append="gr")
        b-form-input#foodMeasureFat(v-model="computedProperties.fat", readonly)
    //- measure calories
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Calories:",
      label-for="foodMeasureCalories"
    )
      b-input-group(append="gr")
        b-form-input#foodMeasureCalories(
          v-model="computedProperties.calories",
          readonly
        )
    //- submit button
    b-button.d-block.ml-auto(
      v-if="updateModal",
      type="submit",
      variant="secondary"
    ) Update
    b-button.d-block.ml-auto(v-else, type="submit", variant="success") Save
</template>

<script>
import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export default {
  props: {
    foodInfo: {
      type: Object,
      default () {
        return {
          foodMeasureName: '',
          foodMeasureQuantity: 0,
          carbohydrates: 0,
          protein: 0,
          fat: 0
        }
      }
    }
  },

  data () {
    return {
      form: {
        foodMeasureName: this.foodInfo.foodMeasureName,
        foodMeasureQuantity: this.foodInfo.foodMeasureQuantity
      }
    }
  },

  computed: {
    computedProperties () {
      const BASE_100_GRAMS_MEASURE = 100
      const MeasureCarbohydrates =
        (this.form.foodMeasureQuantity * this.foodInfo.carbohydrates) /
        BASE_100_GRAMS_MEASURE
      const MeasureProtein =
        (this.form.foodMeasureQuantity * this.foodInfo.protein) /
        BASE_100_GRAMS_MEASURE
      const MeasureFat =
        (this.form.foodMeasureQuantity * this.foodInfo.fat) /
        BASE_100_GRAMS_MEASURE

      return {
        carbohydrates: MeasureCarbohydrates,
        protein: MeasureProtein,
        fat: MeasureFat,
        calories: calculateCalories(
          MeasureCarbohydrates,
          MeasureProtein,
          MeasureFat
        )
      }
    }
  },

  methods: {
    onSubmit () {
      console.log(this.form)
    }
  }
}
</script>
