export default function ($axios, app) {
  const service = {
    // create
    async createPerson (form) {
      return await $axios.$post('/person', form,
        { header: { Authorization: app.$auth.strategy.token.get() } }
      )
    },

    async createPersonWeight (form) {
      return await $axios.$post('/person/person-weight', form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    },
    // read
    async getAllPersons (firstDate, secondDate) {
      return await $axios.$get('/person/person-weight/all',
        {
          params: { idUser: app.$auth.user.idUser, firstDate, secondDate },
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    },

    async getPerson (idPerson, firstDate, secondDate) {
      return await $axios.$get('/person/person-weight',
        {
          params: { idPerson, firstDate, secondDate },
          headers: { Authorization: app.$auth.strategy.token.get() }
        }
      )
    },
    // update
    async updatePersonWeight (form) {
      return await $axios.$put('/person/person-weight', form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    },

    async updatePersonName (form) {
      form.idUser = app.$auth.user.idUser

      return await $axios.$put('/person', form,
        { headers: { Authorization: app.$auth.strategy.token.get() } }
      )
    }
    // delete
  }
  return service
}
