<template lang="pug">
b-modal#loginModal(title="Log In", size="lg", centered="", hide-footer)
  b-form(@submit.prevent="onSubmit")
    b-form-group(label="Email:")
      b-form-input(type="email", required, v-model="form.email")
    b-form-group(label="Password:")
      b-form-input(type="password", required, v-model="form.password")
    b-button(type="submit", variant="primary") Log in
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    async onSubmit () {
      try {
        const response = await this.$auth.loginWith('local', { data: this.form })

        if (response.status === 'error') {
          throw new Error(response.data.message)
        }

        this.$bvModal.hide('loginModal')

        this.$store.dispatch('alert/add', {
          type: null,
          message: response.data.message
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
