<template lang="pug">
b-table(striped, hover, outlined, :items="measures", responsive, :fields="fields")
  template(#cell(edit)="data")
    b-button(
      v-if="data.item.idMeasure !== null",
      variant="secondary",
      @click="onEdit(data.item.idMeasure)"
    )
      i.fa-solid.fa-pen
  template(#cell(remove)="data")
    b-button(
      v-if="data.item.idMeasure !== null",
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
    fields: {
      type: Array,
      default () { return [] }
    },

    measures: {
      type: Array,
      default () { return [] }
    }
  },

  methods: {
    onEdit (idMeasure) {
      this.$emit('on-edit', idMeasure)

      this.$bvModal.show('createFoodMeasureModal')
    },

    async onDelete (idMeasure) {
      try {
        const response = await this.$foodsService
          .deleteFoodMeasure(idMeasure)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$emit('delete-measure')

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
