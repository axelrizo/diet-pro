<template lang="pug">
b-modal#newFoodModal(title="New Food", size="lg", centered, hide-footer)
  BaseFoodForm(@onSubmitFoodForm="onSubmit" :foodQuantityWarning="true")
</template>

<script>
export default {
  methods: {
    onSubmit (payload) {
      console.log(payload)
    }
  }
}
</script>
