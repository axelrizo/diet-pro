export default function ($axios, app) {
  const service = {
    async deleteMeal (idMeal) {
      return await $axios.$delete(`/meals/${idMeal}`,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    }
  }
  return service
}
