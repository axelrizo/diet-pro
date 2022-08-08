<template lang="pug">
b-form.mt-3.mb-2(inline, @submit.prevent="onSubmit()")
  label.mr-sm-2(for="upload-weight") Upload last weight:
  b-input-group.ml-sm-3.mt-2.mt-sm-0(append="kg")
    b-form-input#upload-weight(type="number", step="0.1", v-model="form.weight")
  b-button.ml-sm-3.mt-2.mt-sm-0(
    v-if="canUpdateItsInfo",
    type="submit",
    variant="success"
  ) Save
  b-button.ml-sm-3.mt-2.mt-sm-0(v-else, type="submit", variant="secondary") Update
</template>

<script>
import {
  createNewPersonWeight,
  updatePersonWeight
} from '@/services/persons.services'

export default {
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
        idPerson: this.idPerson,
        date: null
      }
    }
  },

  computed: {
    computedDate () {
      const currentJSDate = new Date()
      const day = currentJSDate.getDate()
      const month = currentJSDate.getMonth() + 1
      const year = currentJSDate.getFullYear()
      return `${year}-${month}-${day}`
    }
  },

  methods: {
    onSubmit () {
      if (this.canUpdateItsInfo) {
        return this.createRegister()
      }
      return this.updateRegister()
    },

    async updateRegister () {
      try {
        this.form.date = this.computedDate

        const response = await updatePersonWeight(
          this.form,
          this.$auth.strategy.token.get()
        )

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
    },

    async createRegister () {
      try {
        this.form.date = this.computedDate

        const response = await createNewPersonWeight(
          this.form,
          this.$auth.strategy.token.get()
        )

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
