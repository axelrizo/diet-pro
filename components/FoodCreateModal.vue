<template lang="pug">
b-modal#createFoodModal(title="New Food", size="lg", centered, hide-footer)
  FoodForm(@on-submit="onSubmit", :food-quantity-warning="true")
    b-button.ml-auto.d-block(type="submit", variant="success") Save
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'

export default {
  mixins: [mixinHandleNotification],

  methods: {
    async onSubmit (form) {
      try {
        const response = await this.$usersService
          .createFood(form)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$emit('on-submit')

        this.$bvModal.hide('createFoodModal')

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
