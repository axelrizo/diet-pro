<template lang="pug">
b-form.mt-3.mb-2(inline, @submit.prevent="onSubmit()")
  label.mr-sm-2(for="upload-weight") Upload last weight:
  b-input-group.ml-sm-3.mt-2.mt-sm-0(append="kg")
    b-form-input#upload-weight(
      type="number",
      step="0.1",
      v-model="form.weight"
    )
  b-button.ml-sm-3.mt-2.mt-sm-0(
    v-if="canUpdateItsInfo",
    type="submit",
    variant="success"
  ) Save
  b-button.ml-sm-3.mt-2.mt-sm-0(v-else, type="submit", variant="secondary") Update
</template>

<script>
import { formatToConsultApi } from '@/helpers/handleDates'
import { mixinHandleNotification } from '@/mixins/handleNotification'

export default {
  mixins: [mixinHandleNotification],

  props: {
    idPerson: {
      type: Number,
      default: null
    },
    canUpdateItsInfo: {
      type: Boolean,
      default: true
    },
    lastWeight: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      form: {
        weight: this.lastWeight,
        date: null
      }
    }
  },

  methods: {
    onSubmit () {
      if (this.canUpdateItsInfo) { return this.createRegister() }
      return this.updateRegister()
    },

    async updateRegister () {
      try {
        this.form.date = formatToConsultApi(new Date())

        const response = await this.$personService
          .updatePersonWeight(this.idPerson, this.form)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$emit('fetch')

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    },

    async createRegister () {
      try {
        this.form.date = formatToConsultApi(new Date())
        console.log(this.form.date)

        const response = await this.$personService
          .createPersonWeight(this.idPerson, this.form)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$emit('fetch')

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
