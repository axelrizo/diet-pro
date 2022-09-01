<template lang="pug">
b-container
  //- SEARCH-BAR
  BaseSearchBar(@onSubmit="onSubmitSearch")
  //- CREATE MEAL MODAL
  b-modal#createMealModal(title="New Meal", size="lg", centered, hide-footer)
    b-form.pb-4(@submit.prevent="onSubmit")
      //- CREATE MEAL MODAL - name
      b-form-group(
        label-cols="5",
        label-cols-lg="2",
        label="Name:",
        label-for="mealName"
      )
        b-input-group
          b-form-input#mealName(v-model="formCreateMeal.name")
      //- CREATE MEAL MODAL - measure
      b-form-group(
        label-cols="5",
        label-cols-lg="2",
        label="Measure:",
        label-for="mealMeasure"
      )
        b-input-group
          b-form-input#mealMeasure(placeholder="Ex: Portion", v-model="formCreateMeal.measure")
      b-button.mt-4(
        v-b-modal.addNewFoodToMeal,
        block,
        size="lg",
        variant="success",
        @click="fetchFoods()"
      ) Add new food
      b-button.ml-auto.d-block(type="submit", variant="success") Save
  //- ADD NEW FOOD MODAL
  b-modal#addNewFoodToMeal(title="Add foods", size="lg", centered, hide-footer)
    BaseSearchBar(@onSubmit="onSubmitFoodSearch()")
    div(v-for="(food, index) in foods", :key="index")
      h4 {{ food.name }}
      b-table(striped, hover, :items="food.measures", responsive, outlined)
        template(#cell(quantity)="data")
          b-input(type="number" @input="data.item.value = parseInt($event)" min="1" value="1")
        template(#cell(add)="data")
          b-button(
            @click="addFoodToCreateMeal(data.item)",
            variant="success"
          ) add
  b-button.mt-4(v-b-modal.createMealModal, block, size="lg", variant="success") Add new meal
  //- COLLAPSE ELEMENTS
  BaseIterableCollapse.mt-3(v-for="meal in meals", :key="meal.idMeal")
    template(#button)
      b-button(block, variant="primary")
        b-row
          b-col.px-1.d-flex.align-items-center.justify-content-center(cols="4") {{ meal.name }}
          b-col(cols="8")
            b-row
              b-col.px-1(cols="3") Carbs
              b-col.px-1(cols="3") Prot
              b-col.px-1(cols="3") Fat
              b-col.px-1(cols="3") Cal
            b-row
              b-col.px-1(cols="3") {{ meal.carbohydrates }} #[span.d-none.d-sm-inline gr]
              b-col.px-1(cols="3") {{ meal.protein }} #[span.d-none.d-sm-inline gr]
              b-col.px-1(cols="3") {{ meal.fat }} #[span.d-none.d-sm-inline gr]
              b-col.px-1(cols="3") {{ meal.calories }} #[span.d-none.d-sm-inline kcal]
    template(#content)
      b-row.m-2
        b-col
          b-table(
            striped,
            hover,
            :items="meal.foodsTable",
            responsive,
            outlined
          )
      b-row.m-2
        b-col
          b-button(block, variant="danger", @click="onDeleteMeal(meal.idMeal)") Delete
        b-col
          b-button(block, variant="secondary", :to="`meals/${meal.idMeal}`") Details/Edit
</template>

<script>
import { calculateCalories } from '@/helpers/handleCaloriesCalc'
import { mixinHandleNotification } from '@/mixins/handleNotification'

export default {
  mixins: [mixinHandleNotification],

  data () {
    return {
      meals: [],
      foods: [],
      formCreateMeal: {
        name: '',
        measure: ''
      }
    }
  },

  async fetch () {
    this.meals = await this.fetchMeals()
    await this.fetchFoods()
  },

  methods: {
    async fetchMeals (search = '', pagination = 1) {
      const BASE_MEASURE = 'gr'
      const response = await this.$usersService.getMeals(search, pagination)
      let meals = response.data.meals

      meals = meals.map((meal) => {
        if (meal.idFood === null) {
          return meal
        }

        // get an object sum of every food macro nutrient cal if we had measures or not
        const { carbohydrates, protein, fat } = meal.foods.reduce(
          (accumulate, current) => {
            if (!current.measure) {
              accumulate.carbohydrates +=
                (current.carbohydrates / 100) * current.quantity
              accumulate.protein += (current.protein / 100) * current.quantity
              accumulate.fat += (current.fat / 100) * current.quantity
            } else {
              accumulate.carbohydrates +=
                (current.carbohydrates / 100) *
                (current.measure.quantity * current.quantity)
              accumulate.protein +=
                (current.protein / 100) *
                (current.measure.quantity * current.quantity)
              accumulate.fat +=
                (current.fat / 100) *
                (current.measure.quantity * current.quantity)
            }
            return accumulate
          },
          { carbohydrates: 0, protein: 0, fat: 0 }
        )

        // table to show the info of every meal
        const foodsTable = meal.foods.map((food) => {
          let row = {
            foodName: food.name,
            quantity: food.quantity,
            measure: food.measure ? food.measure.name : BASE_MEASURE,
            totalGrams: food.measure
              ? food.measure.quantity * food.quantity
              : food.quantity
          }
          row = {
            ...row,
            carbohydrates: (food.carbohydrates / 100) * row.totalGrams,
            protein: (food.protein / 100) * row.totalGrams,
            fat: (food.fat / 100) * row.totalGrams
          }
          row = {
            ...row,
            calories: calculateCalories(
              row.carbohydrates,
              row.protein,
              row.fat
            )
          }
          return row
        })

        const calories = calculateCalories(carbohydrates, protein, fat)

        return { carbohydrates, protein, fat, calories, foodsTable, ...meal }
      })

      return meals
    },

    async onSubmitSearch (form) {
      this.meals = await this.fetchMeals(form.search)
    },

    async onDeleteMeal (id) {
      try {
        const response = await this.$mealsService
          .deleteMeal(id)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$fetch()

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    },

    async fetchFoods (search = '', pagination = 1) {
      const response = await this.$usersService.getFoods(search, pagination)
      this.foods = response.data.foods.map((food) => {
        const { carbohydrates, protein, fat, idFood } = food
        const baseMeasures = {
          measureName: 'gr',
          idFood,
          carbohydrates,
          protein,
          fat,
          calories: calculateCalories(carbohydrates, protein, fat),
          quantity: '',
          add: ''
        }

        let measures = [baseMeasures]

        if (food.items) {
          food.items.forEach((measure) => {
            const { measureName, idMeasure } = measure
            let newMeasure = {
              idMeasure,
              measureName,
              carbohydrates: (food.carbohydrates / 100) * measure.grams,
              protein: (food.protein / 100) * measure.grams,
              fat: (food.fat / 100) * measure.grams
            }
            newMeasure = {
              ...newMeasure,
              calories: calculateCalories(
                newMeasure.carbohydrates,
                newMeasure.protein,
                newMeasure.fat
              ),
              quantity: '',
              add: ''
            }
            measures = [...measures, newMeasure]
          })
        }

        const row = {
          idFood: food.idFood,
          name: food.name,
          measures
        }
        return row
      })
      console.log(this.foods)
    },

    async onSubmitFoodSearch (search) {},

    addFoodToCreateMeal (data) {
      console.log(data)
    }
  }
}
</script>
