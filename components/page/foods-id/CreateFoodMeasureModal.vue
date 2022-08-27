<template lang="pug">
b-modal#createFoodMeasureModal(
  title="New Food Measure",
  size="lg",
  centered,
  hide-footer
)
  b-form(@submit.prevent="onSubmit")
    h5 Base measure
    PageFoodIdFoodMeasuresTable(:measures="measures")
    //- measure name
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Measure name:",
      label-for="foodMeasureName"
    )
      b-form-input#foodMeasureName(v-model="form.name")
    //- measure quantity
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Quantity:",
      label-for="foodMeasureQuantity"
    )
      b-input-group(append="gr")
        b-form-input#foodMeasureQuantity(v-model="form.quantity")
    //- measure carbohydrates
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Carbohydrates:",
      label-for="foodMeasureCarbohydrates"
    )
      b-input-group(append="gr")
        b-form-input#foodMeasureCarbohydrates(
          v-model="computedProperties.carbohydrates",
          readonly
        )
    //- measure protein
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Protein:",
      label-for="foodMeasureProtein"
    )
      b-input-group(append="gr")
        b-form-input#foodMeasureProtein(
          v-model="computedProperties.protein",
          readonly
        )
    //- measure fat
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Fat:",
      label-for="foodMeasureFat"
    )
      b-input-group(append="gr")
        b-form-input#foodMeasureFat(v-model="computedProperties.fat", readonly)
    //- measure calories
    b-form-group(
      label-cols="5",
      label-cols-lg="2",
      label="Calories:",
      label-for="foodMeasureCalories"
    )
      b-input-group(append="gr")
        b-form-input#foodMeasureCalories(
          v-model="computedProperties.calories",
          readonly
        )
    //- submit button
    b-button.d-block.ml-auto(
      v-if="idMeasure !== 0",
      type="submit",
      variant="secondary"
    ) Update
    b-button.d-block.ml-auto(v-else, type="submit", variant="success") Save
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'
import { calculateCalories } from '@/helpers/handleCaloriesCalc'

export default {
  mixins: [mixinHandleNotification],

  props: {
    idMeasure: {
      type: Number,
      default: 0
    },

    idFood: {
      type: Number,
      default: 0
    },

    name: {
      type: String,
      default: ''
    },

    quantity: {
      type: Number,
      default: 0
    },

    measures: {
      type: Array,
      default () { return [] }
    },

    carbohydrates: {
      type: Number,
      default: 0
    },

    protein: {
      type: Number,
      default: 0
    },

    fat: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      form: {
        name: this.name,
        quantity: this.quantity
      }
    }
  },

  computed: {
    computedProperties () {
      const BASE_100_GRAMS = 100
      const { quantity } = this.form

      const carbohydrates = (quantity * this.carbohydrates) / BASE_100_GRAMS
      const protein = (quantity * this.protein) / BASE_100_GRAMS
      const fat = (quantity * this.fat) / BASE_100_GRAMS

      return {
        carbohydrates,
        protein,
        fat,
        calories: calculateCalories(carbohydrates, protein, fat)
      }
    }
  },

  watch: {
    name () {
      this.form.name = this.name
    },

    quantity () {
      this.form.quantity = this.quantity
    }
  },

  methods: {
    onSubmit () {
      if (this.idMeasure !== 0) {
        return this.updateFood()
      }
      return this.createFood()
    },

    async createFood () {
      try {
        const response = await this.$foodsService
          .createFoodMeasure(this.idFood, this.form)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$emit('fetchInfo')

        this.$bvModal.hide('createFoodMeasureModal')

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    },

    async updateFood () {
      try {
        const response = await this.$foodsService
          .updateFoodMeasure(this.idFood, this.idMeasure, this.form)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$emit('fetchInfo')

        this.$bvModal.hide('createFoodMeasureModal')

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
