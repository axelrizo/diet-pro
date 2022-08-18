export default function ($axios, app) {
  const service = {
    // create
    async createFood (form) {
      form.idUser = app.$auth.user.idUser
      return await $axios.$post('/food', form,
        { header: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    // read
    async getFoods (search, pagination) {
      const idUser = app.$auth.user.idUser
      return await $axios.$get('/food',
        {
          params: { search, pagination, idUser },
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    }
    // update
    // delete
  }
  return service
}
