<template lang="pug">
b-form.mt-5.d-flex(@submit.prevent="onSubmit()")
  b-form-input.w-100(placeholder="Search" v-model="form.search")
  b-button.ml-2(variant="success", type="submit") Search
</template>

<script>
export default {
  data () {
    return {

      form: {
        search: null
      }
    }
  },

  methods: {

    onSubmit () {
      this.$emit('onSubmitSearch', this.form)
    }
  }
}
</script>
