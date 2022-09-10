export default function ($axios, app) {
  const service = {
    // create
    async createPerson (form) {
      const idUser = app.$auth.user.idUser
      return await $axios.$post(`/users/${idUser}/persons`, form,
        { header: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    async createFood (form) {
      const idUser = app.$auth.user.idUser
      return await $axios.$post(`/users/${idUser}/foods`, form,
        { header: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    async createMeal (form) {
      const idUser = app.$auth.user.idUser
      return await $axios.$post(`/users/${idUser}/meals`, form,
        { header: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    // read
    async getPersonsWeights (firstDate, secondDate) {
      const idUser = app.$auth.user.idUser
      return await $axios.$get(`/users/${idUser}/person-weights`,
        {
          params: { firstDate, secondDate },
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    },
    async getFoods (search, pagination) {
      const idUser = app.$auth.user.idUser
      return await $axios.$get(`/users/${idUser}/foods`,
        {
          params: { search, pagination },
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    },
    async getPerson (idPerson, firstDate, secondDate) {
      const idUser = app.$auth.user.idUser
      return await $axios.$get(`users/${idUser}/persons/${idPerson}/person-weights`,
        {
          params: { firstDate, secondDate },
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    },
    async getFood (idFood) {
      const idUser = app.$auth.user.idUser
      return await $axios.$get(`users/${idUser}/foods/${idFood}`,
        {
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    },
    async getMeals (search, pagination) {
      const idUser = app.$auth.user.idUser
      return await $axios.$get(`/users/${idUser}/meals`,
        {
          params: { search, pagination },
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    },
    async getMeal (idMeal) {
      const idUser = app.$auth.user.idUser
      return await $axios.$get(`/users/${idUser}/meals/${idMeal}`,
        {
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    },
    // update
    async updatePersonName (idPerson, form) {
      const idUser = app.$auth.user.idUser
      return await $axios.$put(`users/${idUser}/persons/${idPerson}`, form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    async updateFood (idFood, form) {
      const idUser = app.$auth.user.idUser
      return await $axios.$put(`users/${idUser}/foods/${idFood}`, form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    async updateMeal (idMeal, form) {
      const idUser = app.$auth.user.idUser
      return await $axios.$put(`users/${idUser}/foods/${idMeal}`, form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    }
    // delete
  }
  return service
}
