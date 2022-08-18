const calculateCalories = (carbohydrates, protein, fat, fix) => {
  const CALORIES_PER_1_GRAM_FAT = 9
  const CALORIES_PER_1_GRAM_CARBOHYDRATES = 4
  const CALORIES_PER_1_GRAM_PROTEIN = 4

  const caloriesFat = fat * CALORIES_PER_1_GRAM_FAT
  const caloriesCarbohydrates = carbohydrates * CALORIES_PER_1_GRAM_CARBOHYDRATES
  const caloriesProtein = protein * CALORIES_PER_1_GRAM_PROTEIN

  return (caloriesFat + caloriesCarbohydrates + caloriesProtein).toFixed(fix)
}

export {
  calculateCalories
}
