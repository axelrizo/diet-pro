<template lang="pug">
b-modal#signup(title="Sign Up" size="lg" centered hide-footer)
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
        :state="repitedPasswordState",
        v-model="form.repitedPassword"
      )
    b-button(type="submit", variant="primary") Sign up
</template>

<script>
import { register } from '~/services/user.services'

export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        repitedPassword: '',
        username: ''
      },
      repitedPasswordState: null,
      passwordState: null
    }
  },

  watch: {
    'form.password' (newForm, oldForm) {
      this.onWritePassword()
    },
    'form.repitedPassword' (newForm, oldForm) {
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

      if (this.form.repitedPassword.length === 0) {
        this.repitedPasswordState = null
      } else if (this.form.password === this.form.repitedPassword) {
        this.repitedPasswordState = true
      } else {
        this.repitedPasswordState = false
      }
    },

    async onSubmit () {
      try {
        const dataToSend = {
          email: this.form.email,
          password: this.form.password
        }

        if (!this.passwordState || !this.repitedPasswordState) {
          throw new Error('Make sure that the both password are the same')
        }

        const response = await register(dataToSend)

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
