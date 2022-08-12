<template lang="pug">
b-container
  b-form.mt-4.mb-2(inline)
    label.mr-sm-2(for="name") Name:
    b-input#name(type="text", v-model="person.name")
    b-button.ml-sm-3.mt-2.mt-sm-0(type="submit") Save
  BaseLineChart(
    ref="idPersonChart",
    v-if="person.chartData.labels",
    :labels="person.chartData.labels",
    :data="person.chartData.data"
  )
  h1(v-else) We don't have data
  b-form.mt-4.mb-2(inline, @submit.prevent="fetchInfo()")
    b-input.mr-2(type="date", v-model="dates.firstDate")
    b-input.mr-2(type="date", v-model="dates.secondDate")
    b-button(type="submit", variant="success") Consult
  b-form.mt-4.mb-2(inline)
    label.mr-sm-2(for="average") Average in:
    b-input-group(append="days")
      b-form-input#average(type="number", v-model="average" min="1")
  b-table(:items="computedTableItems", striped, hover, responsive)
</template>

<script>
import {
  formatToConsultApi,
  formatFriendlyToShow,
  subtractDaysFromDate
} from '@/helpers/handleDates'

export default {
  async asyncData (context) {
    const DEFAULT_DAYS_TO_SHOW = 60
    const today = new Date()

    const dates = {
      firstDate: formatToConsultApi(
        subtractDaysFromDate(today, DEFAULT_DAYS_TO_SHOW)
      ),
      secondDate: formatToConsultApi(today)
    }

    const response = await context.$personService.getPerson(
      context.route.params.idPerson,
      dates.firstDate,
      dates.secondDate
    )

    const person = response.data.person

    person.chartData.labels = person.chartData.labels.map(dateLabel =>
      formatFriendlyToShow(new Date(dateLabel))
    )

    return { dates, person }
  },

  data () {
    return {
      average: 7
    }
  },

  computed: {
    computedTableItems () {
      const personChartData = this.person.chartData.data
      const personChartLabels = this.person.chartData.labels
      const firstWeight = personChartData[0]

      const arrayWeightLostAndAverage = personChartLabels.map((label, index) => {
        // weight lost
        let totalWeightLost = null

        if (index > 0) {
          totalWeightLost = (firstWeight - personChartData[index]).toFixed(1)
        }

        // average weight
        const GAP_BETWEEN_THE_INDEX_AND_THE_AVERAGE = 1
        const NEED_MORE_THAN_0_IN_AVERAGE_OR_CRASH = this.average > 0
        const normalizedIndex = index + GAP_BETWEEN_THE_INDEX_AND_THE_AVERAGE
        let averageWeight = null

        if (normalizedIndex >= this.average && NEED_MORE_THAN_0_IN_AVERAGE_OR_CRASH) {
          const initialPartOfTheArray = normalizedIndex - parseInt(this.average)
          const endPartOfTheArray = normalizedIndex

          const slicedArray = personChartData.slice(
            initialPartOfTheArray,
            endPartOfTheArray
          )

          averageWeight = slicedArray.reduce((accumulator, current) => accumulator + current)
          averageWeight /= this.average
          averageWeight = averageWeight.toFixed(1)
        }

        return {
          date: label,
          weight: personChartData[index],
          averageWeight,
          totalWeightLost
        }
      })

      return arrayWeightLostAndAverage
    }
  },

  methods: {
    async fetchInfo () {
      try {
        const response = await this.$personService.getPerson(
          this.$route.params.idPerson,
          this.dates.firstDate,
          this.dates.secondDate
        )

        const person = response.data.person

        person.chartData.labels = person.chartData.labels.map(dateLabel =>
          formatFriendlyToShow(new Date(dateLabel))
        )

        this.person = person
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
