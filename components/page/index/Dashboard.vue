<template lang="pug">
b-container.pt-5
  PageIndexDashboardNewPersonModal(@fetch="$fetch")
  PageIndexDashboardPersonCard(
    v-for="(person, index) in persons",
    :key="index",
    :person="person",
    @fetch="$fetch"
  )
  .mt-5
    b-button(v-b-modal.newPersonModal, variant="success", size="lg", block) Add an user
</template>

<script>
import {
  formatToConsultApi,
  formatFriendlyToShow,
  subtractDaysFromDate
} from '@/helpers/handleDates'

export default {
  data () {
    return {
      persons: []
    }
  },

  async fetch () {
    const DEFAULT_DAYS_TO_SHOW = 60
    const today = new Date()
    const firstDate = formatToConsultApi(
      subtractDaysFromDate(today, DEFAULT_DAYS_TO_SHOW)
    )
    const secondDate = formatToConsultApi(today)

    const data = await this.$userService.getPersonsWeights(firstDate, secondDate)

    // format date and know if we can update or create new weight
    this.persons = data.data.persons
      .map((element) => {
        if (element.chartData) {
        // know if we can edit this date or not by comparing dates
          const serverLastDate = formatToConsultApi(new Date(element.chartData.labels.at(-1)))
          const currentJSDate = formatToConsultApi(new Date())

          element.canUpdateItsInfo = serverLastDate !== currentJSDate
          // iterate each label and change format
          element.chartData.labels = element.chartData.labels
            .map((date) => {
              return formatFriendlyToShow(new Date(date))
            })
          return element
        }
        return element
      })
  }
}
</script>
