export default function ($axios, app) {
  const service = {
    // create
    async createPerson (form) {
      const idUser = app.$auth.user.idUser
      return await $axios.$post(`/user/${idUser}/person`, form,
        { header: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    async createFood (form) {
      const idUser = app.$auth.user.idUser
      return await $axios.$post(`/user/${idUser}/food`, form,
        { header: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    // read
    async getPersonsWeights (firstDate, secondDate) {
      const idUser = app.$auth.user.idUser
      return await $axios.$get(`/user/${idUser}/person-weight`,
        {
          params: { firstDate, secondDate },
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    },
    async getFoods (search, pagination) {
      const idUser = app.$auth.user.idUser
      return await $axios.$get(`/user/${idUser}/food`,
        {
          params: { search, pagination },
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    },
    async getPerson (idPerson, firstDate, secondDate) {
      const idUser = app.$auth.user.idUser
      return await $axios.$get(`user/${idUser}/person/${idPerson}/person-weight`,
        {
          params: { firstDate, secondDate },
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    },
    async getFood (idFood) {
      const idUser = app.$auth.user.idUser
      return await $axios.$get(`user/${idUser}/food/${idFood}`,
        {
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    },
    // update
    async updatePersonName (idPerson, form) {
      const idUser = app.$auth.user.idUser
      return await $axios.$put(`user/${idUser}/person/${idPerson}`, form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    async updateFood (idFood, form) {
      const idUser = app.$auth.user.idUser
      return await $axios.$put(`user/${idUser}/food/${idFood}`, form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    }
    // delete
  }
  return service
}
