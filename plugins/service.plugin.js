import authService from './services/auth.service'
import usersService from './services/users.service'
import personsService from './services/persons.service'
import foodsService from './services/foods.service'

export default function ({ $axios, app }, inject) {
  inject('authService', authService($axios))
  inject('usersService', usersService($axios, app))
  inject('personsService', personsService($axios, app))
  inject('foodsService', foodsService($axios, app))
}
