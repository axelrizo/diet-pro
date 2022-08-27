<template lang="pug">
b-container
  PagePersonsIdNameForm(:form="formName", :idPerson="idPerson")
  BaseLineChart(
    ref="idPersonChart",
    v-if="person.chartData.data[0] !== null",
    :labels="person.chartData.labels",
    :data="person.chartData.data"
  )
  h1(v-else).my-5 We don't have data
  PagePersonsIdDateForm(:dates="formDate", @onSubmitDates="onSubmitDates")
  PagePersonsIdWeightTable(
    v-if="person.chartData.data[0] !== null"
    :labels="person.chartData.labels",
    :data="person.chartData.data"
  )
</template>

<script>
import {
  formatToConsultApi,
  formatFriendlyToShow,
  subtractDaysFromDate
} from '@/helpers/handleDates'
import { mixinHandleNotification } from '@/mixins/handleNotification'

export default {
  mixins: [mixinHandleNotification],

  data () {
    return {
      average: 7,
      idPerson: null,
      person: {
        chartData: {
          labels: [],
          data: []
        }
      },
      formDate: {
        firstDate: null,
        secondDate: null
      },
      formName: {
        name: null
      }
    }
  },

  async fetch () {
    const DEFAULT_DAYS_TO_SHOW = 60
    const today = new Date()
    const firstDate = formatToConsultApi(
      subtractDaysFromDate(today, DEFAULT_DAYS_TO_SHOW)
    )
    const secondDate = formatToConsultApi(today)
    this.formDate.firstDate = firstDate
    this.formDate.secondDate = secondDate

    await this.fetchInfo(firstDate, secondDate)
  },

  methods: {
    async fetchInfo (firstDate, secondDate) {
      try {
        const response = await this.$userService
          .getPerson(this.$route.params.idPerson, firstDate, secondDate)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.person = response.data.person
        this.idPerson = this.person.idPerson
        this.formName.name = this.person.name

        this.person.chartData.labels = this.person.chartData.labels.map(
          dateLabel => formatFriendlyToShow(new Date(dateLabel))
        )
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    },

    onSubmitDates (dates) {
      this.fetchInfo(dates.firstDate, dates.secondDate)
    }
  }
}
</script>
