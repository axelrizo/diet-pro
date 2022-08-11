import authService from './services/auth.service'
import personService from './services/person.service'
import foodService from './services/food.service'

export default function ({ $axios, app }, inject) {
  inject('authService', authService($axios))
  inject('personService', personService($axios, app))
  inject('foodService', foodService($axios, app))
}
