<template lang="pug">
b-modal#createFoodModal(title="New Food", size="lg", centered, hide-footer)
  BaseFoodForm(@onSubmitFoodForm="onSubmit" :foodQuantityWarning="true")
</template>

<script>
export default {
  methods: {
    async onSubmit (form) {
      try {
        const response = await this.$foodService.createFood(form)

        this.$bvModal.hide('createFoodModal')

        this.$store.dispatch('alert/add', {
          type: null,
          message: response.message
        })
      } catch (error) {
        this.$store.dispatch('alert/add', {
          type: 'error',
          message: error.message
        })
      }
    }
  }
}
</script>
