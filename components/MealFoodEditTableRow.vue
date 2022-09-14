<template lang="pug">
b-tr
  b-td {{ food.foodName }}
  b-td: b-input(
    type="number",
    :value="food.quantity",
    @input="$emit('on-input', { event: $event, index })"
  )
  b-td {{ food.measureName }}
  b-td {{ food.grams }}
  b-td {{ food.carbohydrates }}
  b-td {{ food.protein }}
  b-td {{ food.fat }}
  b-td {{ food.calories }}
  b-td: b-button(variant="danger", @click="$emit('remove-food', index)"): i.fa-solid.fa-trash
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
