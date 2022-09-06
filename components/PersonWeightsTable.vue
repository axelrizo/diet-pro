<template lang="pug">
div
  b-form.mt-4.mb-2(inline)
    label.mr-sm-2 Average in:
      b-input-group(append="days")
        b-form-input(type="number", v-model="average", min="1")
  b-table(:items="computedTableItems", striped, hover, responsive)
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    labels: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      average: 7
    }
  },

  computed: {
    computedTableItems () {
      const firstWeight = this.data[0]

      const arrayWeightLostAndAverage = this.labels.map((label, index) => {
        // weight lost
        let totalWeightLost = null

        if (index > 0) {
          totalWeightLost = (firstWeight - this.data[index]).toFixed(1)
        }

        // average weight
        const GAP_BETWEEN_THE_INDEX_AND_THE_AVERAGE = 1
        const NEED_MORE_THAN_0_IN_AVERAGE_OR_CRASH = this.average > 0
        const normalizedIndex = index + GAP_BETWEEN_THE_INDEX_AND_THE_AVERAGE
        let averageWeight = null

        if (
          normalizedIndex >= this.average &&
          NEED_MORE_THAN_0_IN_AVERAGE_OR_CRASH
        ) {
          const initialPartOfTheArray =
            normalizedIndex - parseInt(this.average)
          const endPartOfTheArray = normalizedIndex

          const slicedArray = this.data.slice(
            initialPartOfTheArray,
            endPartOfTheArray
          )

          averageWeight = slicedArray.reduce(
            (accumulator, current) => accumulator + current
          )
          averageWeight /= this.average
          averageWeight = averageWeight.toFixed(1)
        }

        return {
          date: label,
          weight: this.data[index],
          averageWeight,
          totalWeightLost
        }
      })

      return arrayWeightLostAndAverage
    }
  }
}
</script>
