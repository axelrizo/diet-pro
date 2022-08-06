<template lang="pug">
b-container.pt-5
  PageIndexDashboardNewPersonModal(@fetch="$fetch")
  PageIndexDashboardPersonCard(
    v-for="(person, index) in persons",
    :key="index",
    :person="person"
  )
  .mt-5
    b-button(v-b-modal.newPersonModal variant="success" size="lg" block) Add an user
</template>

<script>
import { getAllPersons } from '@/services/persons.services'

export default {
  data () {
    return {
      persons: []
    }
  },

  async fetch () {
    const today = new Date()

    const secondDate = today.toISOString().slice(0, 10)
    today.setDate(today.getDate() - 60)
    const firstDate = today.toISOString().slice(0, 10)

    const token = this.$auth.strategy.token.get()
    const userId = this.$auth.user.idUser

    const data = await getAllPersons(userId, firstDate, secondDate, token)

    // format date and know if we can update or create new weight
    const newFortmatedArray = data.data.persons.map((element) => {
      element.canUpdateItsInfo = true
      if (element.chartData) {
        // know if we can edit this date or not by comparing dates
        const serverDate = new Date(element.chartData.labels.at(-1))
        const currentJSDate = new Date()
        if (serverDate.toLocaleDateString('en-US') === currentJSDate.toLocaleDateString('en-US')) {
          element.canUpdateItsInfo = false
        } else {
          element.canUpdateItsInfo = true
        }
        // iterate each label and change format
        const newDates = element.chartData.labels.map((date) => {
          const jsDate = new Date(date)
          const dateConfig = { month: 'short', day: 'numeric' }
          const newDate = jsDate.toLocaleDateString('en-US', dateConfig)
          return newDate
        })
        element.chartData.labels = newDates
        return element
      }
      return element
    })

    this.persons = newFortmatedArray
  }
}
</script>
