<template lang="pug">
b-modal#signupModal(title="Sign Up", size="lg", centered, hide-footer)
  b-form(ref="registerForm", @submit.prevent="onSubmit")
    b-form-group(label="Email:")
      b-form-input(type="email", required, v-model="form.email")
    b-form-group(label="Username:")
      b-form-input(required, v-model="form.username")
    b-form-group(label="Password:")
      b-form-input(
        type="password",
        required,
        :state="passwordState",
        v-model="form.password"
      )
    b-form-group(label="Confirm password:")
      b-form-input(
        type="password",
        required,
        :state="repeatedPasswordState",
        v-model="form.repeatedPassword"
      )
    b-button.ml-auto.d-block(type="submit", variant="primary") Sign up
  hr
  p Already have an account? #[b-link(@click="$bvModal.hide('signupModal')", v-b-modal.loginModal) Log in]
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'

export default {
  mixins: [mixinHandleNotification],

  data () {
    return {
      form: {
        email: '',
        password: '',
        repeatedPassword: '',
        username: ''
      },
      repeatedPasswordState: null,
      passwordState: null
    }
  },

  watch: {
    'form.password' (newForm, oldForm) {
      this.onWritePassword()
    },
    'form.repeatedPassword' (newForm, oldForm) {
      this.onWritePassword()
    }
  },

  methods: {
    onWritePassword () {
      if (this.form.password.length === 0) {
        this.passwordState = null
      } else if (this.form.password.length >= 5) {
        this.passwordState = true
      } else {
        this.passwordState = false
      }

      if (this.form.repeatedPassword.length === 0) {
        this.repeatedPasswordState = null
      } else if (this.form.password === this.form.repeatedPassword) {
        this.repeatedPasswordState = true
      } else {
        this.repeatedPasswordState = false
      }
    },

    async onSubmit () {
      try {
        const formToSend = {
          email: this.form.email,
          password: this.form.password,
          username: this.form.username
        }

        if (!this.passwordState || !this.repeatedPasswordState) {
          throw new Error('Make sure that the both password are the same')
        }

        const response = await this.$authService
          .singUp(formToSend)
          .catch((error) => {
            throw new Error(error.response.data.message)
          })

        const responseLogin = await this.$auth
          .loginWith('local', {
            data: this.form
          })
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$bvModal.hide('signupModal')

        this.mixinHandleNotificationSuccessNotification(response.message)
        this.mixinHandleNotificationSuccessNotification(responseLogin.data.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
