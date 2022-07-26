<template lang="pug">
b-container.container-username
  b-card.w-100
    b-form(@submit.prevent="onSubmit")
      b-form-group(label="Pick an username:" label-size="lg")
        b-form-input(size="lg")
      b-button.ml-auto.d-block(type="submit" variant="success") Save
</template>

<script>
export default {
  layout: 'empty',

  methods: {

    onSubmit () {

    }
  }
}
</script>

<style lang="scss">
.container-username{
  height: 100vh;
  display: flex;
  align-items: center;
}
</style>
