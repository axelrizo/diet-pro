<template lang="pug">
div
  b-table(
    :items="items",
    :fields="fields",
    striped,
    hover,
    outlined,
    responsive
  )
    template(#cell(edit)="data")
      b-button(
        v-if="data.item.id !== null",
        variant="secondary",
        @click="$emit('on-edit-measure', data.item.id)"
      )
        i.fa-solid.fa-pen
    template(#cell(remove)="data")
      b-button(
        v-if="data.item.id !== null",
        variant="danger",
        @click="$emit('on-delete-measure', data.item.id)"
      )
        i.fa-solid.fa-trash
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'
export default {
  mixins: [mixinHandleNotification],

  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },

    fields: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
