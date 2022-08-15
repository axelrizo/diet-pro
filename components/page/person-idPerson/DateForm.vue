<template lang="pug">
b-form.mt-4.mb-2(inline, @submit.prevent="onSubmit()")
  b-input.mr-2(type="date", v-model="dates.firstDate")
  b-input.mr-2(type="date", v-model="dates.secondDate")
  b-button(type="submit", variant="success") Consult
</template>

<script>
export default {
  props: {
    dates: {
      type: Object,
      default () { return {} }
    }
  },

  methods: {
    onSubmit () {
      this.$emit('onSubmitDates', this.dates)
    }
  }
}
</script>
