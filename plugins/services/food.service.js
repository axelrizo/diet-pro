export default function ($axios, app) {
  const service = {
    // create
    async createFood (form) {
      form.idUser = app.$auth.user.idUser
      return await $axios.$post('/food', form,
        { header: { Authorization: app.$auth.strategy.token.get() } }
      )
    }
    // read
    // update
    // delete
  }
  return service
}
