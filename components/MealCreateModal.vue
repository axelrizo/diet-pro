<template lang="pug">
b-modal#createMealModal(title="New Meal", size="lg", centered, hide-footer)
  b-form.pb-4(@submit.prevent="onSubmit")
    b-form-group(label-cols="5", label-cols-lg="2", label="Name:")
      b-form-input(v-model="name")
    b-form-group(label-cols="5", label-cols-lg="2", label="Measure:")
      b-form-input(placeholder="Example: Portion", v-model="measure")
    MealFoodEditTable(:foods="foods" @remove-food="removeFood")
    b-button.mt-4(
      v-b-modal.addNewFoodToMeal,
      block,
      size="lg",
      variant="success",
      @click="$emit('add-meal')"
    ) Add new meal
    b-button.ml-auto.d-block(type="submit", variant="success") Save
</template>

<script>
export default {
  data () {
    return {
      name: '',
      measure: '',
      foods: []
    }
  },

  methods: {
    addFood (food) {
      this.foods = [...this.foods, food]
    },

    removeFood (index) {
      this.foods.splice(index, 1)
    }
  }
}
</script>
