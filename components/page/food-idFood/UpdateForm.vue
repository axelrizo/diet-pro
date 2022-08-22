<template lang="pug">
BaseFoodForm(:food="food", @onSubmitFoodForm="onSubmit")
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      default () { return {} }
    }
  },

  methods: {
    onSubmit (payload) {
      console.log(payload)
    }
  }
}
</script>
