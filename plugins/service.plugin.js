import authService from './services/auth.service'
import personService from './services/person.service'

export default function ({ $axios, app }, inject) {
  inject('authService', authService($axios))
  inject('personService', personService($axios, app))
}
