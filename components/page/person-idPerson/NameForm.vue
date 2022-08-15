<template lang="pug">
b-form.mt-4.mb-2(inline, @submit.prevent="onSubmit()")
  label.mr-sm-2(for="name") Name:
  b-input#name(type="text", v-model="form.name")
  b-input#name(type="text", v-model="form.idPerson", hidden)
  b-button.ml-sm-3.mt-2.mt-sm-0(type="submit") Save
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'

export default {
  mixins: [mixinHandleNotification],

  props: {
    form: {
      type: Object,
      default () { return {} }
    }
  },

  methods: {
    async onSubmit () {
      try {
        const response = await this.$personService
          .updatePersonName(this.form)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
