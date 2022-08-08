<template lang="pug">
b-container
  b-form(inline).mt-4.mb-2
    label.mr-sm-2(for="name") Name:
    b-input(type="text" id="name" v-model="user.name")
    b-button(type="submit").ml-sm-3.mt-2.mt-sm-0 Save
  h1 {GRAPH}
  b-form(inline).mt-4.mb-2
    b-input(type="date")
    b-input(type="date")
  b-form(inline).mt-4.mb-2
    label.mr-sm-2(for="average") Average in:
    b-input-group(append="days")
      b-form-input(type="number" id="average")
    b-button(type="submit").ml-sm-3.mt-2.mt-sm-0 Save
  b-table(striped hover :items="items" responsive)
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: '{NAME}'
      },
      items: [
        { date: '3-may-22', weight: 98, weight_lost: 0.2, average: 98, weight_lost_in_average: 0.2 },
        { date: '3-may-22', weight: 97, weight_lost: 0.4, average: 98, weight_lost_in_average: 0.2 },
        { date: '3-may-22', weight: 96, weight_lost: 0.8, average: 97, weight_lost_in_average: 0.2 },
        { date: '3-may-22', weight: 95, weight_lost: 0.2, average: 97, weight_lost_in_average: 0.2 }
      ]
    }
  }
}
</script>
