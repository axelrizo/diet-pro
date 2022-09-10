<template lang="pug">
b-modal#createMealModal(title="New Meal", size="lg", centered, hide-footer)
  MealDetailForm(@on-submit="onSubmit")
    b-button.ml-auto.d-block(
      type="submit",
      variant="success",
      block,
      size="lg"
    ) Save
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'
export default {
  mixins: [mixinHandleNotification],

  methods: {
    async onSubmit (form) {
      try {
        const { name, measure, foods } = form
        const formToSend = {
          name,
          measure,
          foods: foods.map((food) => {
            return {
              idFood: food.data.idFood,
              idMeasure: food.data.idMeasure || null,
              quantity: parseInt(food.quantity)
            }
          })
        }

        const response = await this.$usersService
          .createMeal(formToSend)
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
