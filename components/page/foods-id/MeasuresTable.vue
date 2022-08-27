<template lang="pug">
b-table(striped, hover, outlined, :items="formattedArray", responsive)
  template(#cell(edit)="data")
    b-button(
      v-if="data.item.idMeasure !== undefined",
      variant="secondary",
      @click="onEdit(data.item.idMeasure)"
    )
      i.fa-solid.fa-pen
  template(#cell(erase)="data")
    b-button(
      v-if="data.item.idMeasure !== undefined",
      variant="danger",
      @click="onDelete(data.item.idMeasure)"
    )
      i.fa-solid.fa-trash
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'
export default {
  mixins: [mixinHandleNotification],

  props: {
    actions: {
      type: Boolean,
      default: false
    },

    measures: {
      type: Array,
      default () {
        return [
          {
            quantity: 100,
            idMeasure: 0,
            measureName: 'gr',
            grams: 100,
            carbohydrates: 100,
            protein: 95,
            fat: 15,
            calories: 1000
          }
        ]
      }
    }
  },

  computed: {
    formattedArray () {
      if (this.actions !== true) { return this.measures }
      return this.measures.map((food) => {
        return { ...food, erase: '', edit: '' }
      })
    }
  },

  methods: {
    onEdit (idMeasure) {
      this.$emit('onEdit', idMeasure)

      this.$bvModal.show('createFoodMeasureModal')
    },

    async onDelete (idMeasure) {
      try {
        const response = await this.$foodsService
          .deleteFoodMeasure(idMeasure)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$emit('deleteMeasure')

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
