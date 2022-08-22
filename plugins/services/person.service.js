export default function ($axios, app) {
  const service = {
    // create
    async createPersonWeight (idPerson, form) {
      return await $axios.$post(`/person/${idPerson}/person-weight`, form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    // read
    // update
    async updatePersonWeight (idPerson, form) {
      return await $axios.$put(`/person/${idPerson}/person-weight`, form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    }
    // delete
  }
  return service
}
