<template lang="pug">
b-modal#createMealModal(title="New Meal", size="lg", centered, hide-footer)
  b-form.pb-4(@submit.prevent="onSubmit")
    b-form-group(label-cols="5", label-cols-lg="2", label="Name:")
      b-form-input(v-model="name", required)
    b-form-group(label-cols="5", label-cols-lg="2", label="Measure:")
      b-form-input.mb-3(
        placeholder="Example: Portion",
        v-model="measure",
        required
      )
    MealFoodEditTable(
      :foods="foods",
      @remove-food="removeFood",
      @on-input="onInputQuantity"
    )
    b-button.my-3(
      v-b-modal.addNewFoodToMeal,
      block,
      size="lg",
      variant="success",
      @click="$emit('add-meal')"
    ) Add new meal
    b-button.ml-auto.d-block(type="submit", variant="success") Save
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'
export default {
  mixins: [mixinHandleNotification],

  data () {
    return {
      name: '',
      measure: '',
      foods: []
    }
  },

  methods: {
    addFood (food) {
      if (!this.foods.includes(food)) {
        this.foods = [...this.foods, food]
      } else {
        this.mixinHandleNotificationErrorNotification(
          'You added this before, add other one'
        )
      }
    },

    removeFood (index) {
      this.foods.splice(index, 1)
    },

    onInputQuantity ({ event, index }) {
      this.foods[index].quantity = event
    },

    async onSubmit () {
      try {
        const form = {}
        form.name = this.name
        form.measure = this.measure
        form.foods = this.foods.map((food) => {
          return {
            idFood: food.data.idFood,
            idMeasure: food.data.idMeasure || null,
            quantity: parseInt(food.quantity)
          }
        })

        const response = await this.$usersService
          .createMeal(form)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$emit('on-submit')

        this.$bvModal.hide('createMealModal')

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
