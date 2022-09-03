<template lang="pug">
b-modal#loginModal(title="Log In", size="lg", centered="", hide-footer)
  b-form(@submit.prevent="onSubmit")
    b-form-group(label="Email:")
      b-form-input(type="email", required, v-model="form.email")
    b-form-group(label="Password:")
      b-form-input(type="password", required, v-model="form.password")
    b-button.ml-auto.d-block(type="submit", variant="primary") Log in
  hr
  p Don’t have an account? Create an account #[b-link(@click="$bvModal.hide('loginModal')", v-b-modal.signupModal) Sign In]
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'

export default {
  mixins: [mixinHandleNotification],

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
        const response = await this.$auth
          .loginWith('local', {
            data: this.form
          })
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$bvModal.hide('loginModal')

        this.$router.push('/')

        this.mixinHandleNotificationSuccessNotification(response.data.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
