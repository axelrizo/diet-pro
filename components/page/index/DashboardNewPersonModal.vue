<template lang="pug">
b-modal#newPersonModal(
  title="Add new person",
  size="lg",
  centered="",
  hide-footer
)
  b-form(@submit.prevent="onSubmit")
    b-form-group(label="Name:")
      b-form-input(type="text", required, v-model="form.name")
    b-button.d-block.ml-auto(type="submit", variant="primary") Save
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'

export default {
  mixins: [mixinHandleNotification],

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
        const response = await this.$usersService
          .createPerson(this.form)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$bvModal.hide('newPersonModal')

        this.$emit('fetch')

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
