<template lang="pug">
b-modal#createFoodModal(title="New Food", size="lg", centered, hide-footer)
  BaseFoodForm(@onSubmitFoodForm="onSubmit", :foodQuantityWarning="true")
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'

export default {
  mixins: [mixinHandleNotification],

  methods: {
    async onSubmit (form) {
      try {
        const response = await this.$foodService
          .createFood(form)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$bvModal.hide('createFoodModal')

        this.mixinHandleNotificationSuccessNotification(response.data.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
