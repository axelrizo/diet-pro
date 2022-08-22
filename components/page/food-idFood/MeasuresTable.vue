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
export default {
  props: {
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
      return this.measures.map((food) => {
        return { ...food, erase: '', edit: '' }
      })
    }
  },

  methods: {
    onEdit (payload) {
      console.log('edit' + payload)
    },

    onDelete (payload) {
      console.log('delete' + payload)
    }
  }
}
</script>
