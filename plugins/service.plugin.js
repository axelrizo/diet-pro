import authService from './services/auth.service'
import usersService from './services/users.service'
import personsService from './services/persons.service'
import foodsService from './services/foods.service'
import mealsService from './services/meals.service'

export default function ({ $axios, app }, inject) {
  inject('authService', authService($axios))
  inject('usersService', usersService($axios, app))
  inject('personsService', personsService($axios, app))
  inject('foodsService', foodsService($axios, app))
  inject('mealsService', mealsService($axios, app))
}
