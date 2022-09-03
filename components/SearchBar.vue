<template lang="pug">
b-form.mt-5.d-flex(@submit.prevent="$emit('on-submit', form)")
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
  }
}
</script>
