<template lang="pug">
b-modal#newPersonModal(title="Add new person", size="lg", centered="", hide-footer)
  b-form(@submit.prevent="onSubmit")
    b-form-group(label="Name:")
      b-form-input(type="text", required, v-model="form.name")
    b-button(type="submit", variant="primary").d-block.ml-auto Save
</template>

<script>
import { createNewPerson } from '@/services/persons.services'

export default {
  data () {
    return {
      form: {
        idUser: this.$auth.user.idUser,
        name: ''
      }
    }
  },

  methods: {
    async onSubmit () {
      try {
        const response = await createNewPerson(this.form, this.$auth.strategy.token.get())

        this.$bvModal.hide('newPersonModal')

        this.$emit('fetch')

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
