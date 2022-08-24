export default function ($axios, app) {
  const service = {
    // create
    async createFoodMeasure (idFood, form) {
      return await $axios.$post(`/food/${idFood}/measure`, form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    // read
    // update
    async updateFoodMeasure (idFood, idMeasure, form) {
      return await $axios.$put(`/food/${idFood}/measure/${idMeasure}`, form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    // delete
    async deleteFoodMeasure (idMeasure) {
      return await $axios.$delete(`/food/measure/${idMeasure}`,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    }
  }
  return service
}
