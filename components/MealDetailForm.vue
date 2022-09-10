<template lang="pug">
b-form.pb-4(@submit.prevent="$emit('on-submit', form)")
  FoodsGetModal(@add-food="addFood" :selected-foods="form.foods")
  //- name
  b-form-group(label-cols="5", label-cols-lg="2", label="Name:")
    b-form-input(v-model="form.name", required)
  //- measure
  b-form-group(label-cols="5", label-cols-lg="2", label="Measure:")
    b-form-input.mb-3(
      placeholder="Example: Portion",
      v-model="form.measure",
      required
    )
  MealFoodEditTable(
    :foods="form.foods",
    @remove-food="removeFood",
    @on-input="onInputQuantity"
  )
  b-button.my-3(
    v-b-modal.addNewFoodToMeal,
    block,
    size="lg",
    variant="primary",
    @click="$emit('add-meal')"
  ) Add new food
  slot
</template>

<script>
export default {
  props: {
    meal: {
      type: Object,
      default () {
        return {
          name: '',
          measure: '',
          foods: []
        }
      }
    }
  },

  data () {
    return {
      form: {
        name: this.meal.name,
        measure: this.meal.measure,
        foods: this.meal.foods
      }
    }
  },

  methods: {
    addFood (food) {
      this.form.foods = [...this.form.foods, food]
    },

    removeFood (index) {
      this.form.foods.splice(index, 1)
    },

    onInputQuantity ({ event, index }) {
      this.form.foods[index].quantity = event
    }
  }
}
</script>
