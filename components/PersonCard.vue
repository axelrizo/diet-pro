<template lang="pug">
.my-5
  h3 {{ person.name }}
  PersonCardWeightForm(
    :id-person="person.idPerson",
    :can-update-its-info="person.canUpdateItsInfo",
    :last-weight="person.chartData ? person.chartData.data.at(-1) : 0"
    @fetch="$emit('fetch')"
  )
  div(v-if="person.chartData")
    h5.my-3 Last weight: {{ person.chartData.data.at(-1) }} kg | {{ person.chartData.labels.at(-1) }}
    BaseLineChart(
      :data="person.chartData.data",
      :labels="person.chartData.labels"
    )
  div(v-else)
    h5 Don't have info to do graphs
  b-button(size="lg", block, :to="`persons/${person.idPerson}`") More information
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      default () {
        return {
          name: 'Default',
          canUpdateItsInfo: true,
          idPerson: 0,
          chartData: {
            labels: [
              'Default'
            ],
            data: [10]
          }
        }
      }
    }
  }
}
</script>
