export default function ($axios, app) {
  const service = {
    // create
    async createFoodMeasure (idFood, form) {
      return await $axios.$post(`/foods/${idFood}/measures`, form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    // read
    // update
    async updateFoodMeasure (idFood, idMeasure, form) {
      return await $axios.$put(`/foods/${idFood}/measures/${idMeasure}`, form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    // delete
    async deleteFoodMeasure (idMeasure) {
      return await $axios.$delete(`/foods/measures/${idMeasure}`,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    async deleteFood (idFood) {
      return await $axios.$delete(`/foods/${idFood}`,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    }
  }
  return service
}
