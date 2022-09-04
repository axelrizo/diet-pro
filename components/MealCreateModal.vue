<template lang="pug">
b-modal#createMealModal(title="New Meal", size="lg", centered, hide-footer)
  b-form.pb-4(@submit.prevent="onSubmit")
    //- name
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Name:",
      label-for="mealCreateName"
    )
      b-input-group
        b-form-input#mealCreateName(v-model="name")
    //- measure
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Measure:",
      label-for="mealCreateMeasure"
    )
      b-input-group
        b-form-input#mealCreateMeasure(
          placeholder="Example: Portion",
          v-model="measure"
        )
    //- table
    b-table(
      striped,
      hover,
      :items="foods",
      responsive,
      outlined,
      :fields="['foodName', 'quantity', 'carbohydrates', 'protein', 'fat', 'calories', 'remove']"
    )
      template(#cell(quantity)="data")
        b-input(type="number", v-model="data.item.quantity", min="1")
    b-button.mt-4(
      v-b-modal.addNewFoodToMeal,
      block,
      size="lg",
      variant="success",
      @click="$emit('add-new-food')"
    ) Add new food
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
    }
  }
}
</script>
