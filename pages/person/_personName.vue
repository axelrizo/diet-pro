<template lang="pug">
b-container
  b-form.mt-4.mb-2(inline)
    label.mr-sm-2(for="name") Name:
    b-input#name(type="text", v-model="user.name")
    b-button.ml-sm-3.mt-2.mt-sm-0(type="submit") Save
  BaseLineChart(:labels="chartData.labels", :data="chartData.data")
  b-form.mt-4.mb-2(inline)
    b-input.mr-2(type="date" v-model="dates.firstDate")
    b-input.mr-2(type="date" v-model="dates.secondDate")
    b-button(type="submit", variant="success") Consult
  b-form.mt-4.mb-2(inline)
    label.mr-sm-2(for="average") Average in:
    b-input-group(append="days")
      b-form-input#average(type="number", v-model="average")
  b-table(:items="tableItems", striped, hover, responsive)
</template>

<script>
export default {
  data () {
    return {
      // template needed info
      average: 7,
      dates: {
        // make with beforeMount
        firstDate: '',
        secondDate: ''
      },
      // backend needed info
      user: {
        name: 'AXEL1'
      },
      chartData: {
        labels: [
          'Default',
          'Default',
          'Default',
          'Default',
          'Default',
          'Default',
          'Default'
        ],
        data: [10, 20, 30, 40, 50, 60, 70]
      },
      tableItems: [
        // with computed add weight_lost, average, weight_lost_with_average columns in the table
        { date: '3-may-22', weight: 98 },
        { date: '4-may-22', weight: 97 },
        { date: '5-may-22', weight: 96 },
        { date: '6-may-22', weight: 95 }
      ]
    }
  }

}
</script>
