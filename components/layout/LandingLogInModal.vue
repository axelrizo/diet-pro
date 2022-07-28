<template lang="pug">
b-modal#login(title="Log In" size="lg" centered="" hide-footer)
  b-form(@submit.prevent="onSubmit")
    b-form-group(label="Email:")
      b-form-input(type="email", required, v-model="form.email")
    b-form-group(label="Password:")
      b-form-input(type="password", required, v-model="form.password")
    b-button(type="submit", variant="primary") Log in
</template>

<script>
import { login } from '@/services/user.services'

export default {
  data () {
    return {
      form: {
        email: 'axel@axel.com',
        password: '123456'
      }
    }
  },

  methods: {

    async onSubmit () {
      try {
        const response = await login(this.form)
        console.log(response)

        if (response.status === 'error') {
          throw new Error(response.message)
        }

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
