<template lang="pug">
b-container.py-5
  FoodMeasureCreateModal(
    @fetch-info="$fetch",
    :idFood="parseInt($route.params.id)",
    :idMeasure="idMeasure",
    :name="computedName",
    :quantity="computedQuantity",
    :carbohydrates="parseInt(food.carbohydrates)",
    :protein="parseInt(food.protein)",
    :fat="parseInt(food.fat)",
    :measures="food.items"
  )
  FoodUpdateForm(:food="food", @fetch="$fetch")
  FoodMeasuresTable.mt-4(
    :measures="food.items",
    @delete-measure="$fetch",
    @on-edit="setIdMeasure",
    :fields="['quantity',{key:'name', label:'Measure Name'}, 'grams', 'carbohydrates', 'protein', 'fat', 'calories', 'edit', 'remove']"
  )
  b-button.mt-4(
    variant="success",
    v-b-modal.createFoodMeasureModal,
    block,
    size="lg"
  ) Add new measure
</template>

<script>
import { handleFoodArrays } from '@/helpers/handleArrays'

export default {
  data () {
    return {
      food: {},
      idMeasure: 0
    }
  },

  async fetch () {
    this.food = await this.fetchInfo()
  },

  computed: {
    computedName () {
      if (this.idMeasure === 0) {
        return ''
      }
      return this.food.items.filter(
        measure => measure.idMeasure === this.idMeasure
      )[0].measureName
    },

    computedQuantity () {
      if (this.idMeasure === 0) {
        return 0
      }
      return this.food.items.filter(
        measure => measure.idMeasure === this.idMeasure
      )[0].idMeasure
    }
  },

  mounted () {
    // reset idMeasure every time that close the modal
    this.$root.$on('bv::modal::hidden', (bvEvent, modalId) => {
      if (modalId === 'createFoodMeasureModal') {
        this.idMeasure = 0
      }
    })
  },

  methods: {
    async fetchInfo () {
      const response = await this.$usersService.getFood(
        this.$route.params.id
      )
      return handleFoodArrays([response.data.food])[0]
    },

    setIdMeasure (idMeasure) {
      this.idMeasure = idMeasure
    }
  }
}
</script>
