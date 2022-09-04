<template lang="pug">
BaseCollapse.mt-3
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
export default {
  props: {
    meals: {
      type: Array,
      default () { return [] }
    }
  }
}
</script>
