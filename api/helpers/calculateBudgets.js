/********************************************************
 *                  CALCULATE BUDGETS                   *
 ********************************************************/
module.exports = (user) => {
  const caloric_budget_kcal = calculateCaloricBudget(user);
  const {
    fat_budget_g,
    carb_budget_g,
    protein_budget_g,
  } = calculateMacroBudgets(user, caloric_budget_kcal);

  return {
    caloric_budget_kcal,
    fat_budget_g,
    carb_budget_g,
    protein_budget_g,
  };
};

/********************************************************
 *               CALCULATE CALORIC BUDGET               *
 ********************************************************/
// Calculates a user's caloric budget using the
// Mifflin-St. Jeor Equation for BMR (Basal Metabolic Rate)
// mutiplied by an Activity Factor of (1.2 - 1.9)
// https://www.calculator.net/bmr-calculator.html
function calculateCaloricBudget(user) {
  return Math.round(
    (4.536 * user.weight_lbs +
      15.88 * calculateTotalInches(user.height_ft, user.height_in) -
      5 * calculateAge(user.date_of_birth) +
      (user.gender === 'male' ? 5 : -161)) *
      user.activity_level
  );
}

/********************************************************
 *               CALCULATE TOTAL INCHES                *
 ********************************************************/
function calculateTotalInches(height_ft, height_in) {
  return height_ft * 12 + height_in;
}

/********************************************************
 *               CALCULATE MACRO BUDGETS                *
 ********************************************************/
function calculateMacroBudgets(user, caloric_budget_kcal) {
  return {
    fat_budget_g: Math.round((caloric_budget_kcal * user.fat_ratio_prct) / 9),
    carb_budget_g: Math.round((caloric_budget_kcal * user.carb_ratio_prct) / 9),
    protein_budget_g: Math.round(
      (caloric_budget_kcal * user.protein_ratio_prct) / 9
    ),
  };
}
/********************************************************
 *                    CALCULATE AGE                     *
 ********************************************************/
function calculateAge(date_of_birth) {
  let today = new Date();
  let birthDate = new Date(date_of_birth);
  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDifference = today.getMonth() - birthDate.getMonth();
  let dayDifference = today.getDate() - birthDate.getDate();
  // handles edge case where when user's birth month or birth day
  // falls after current date - in this case decrement the age by 1
  // for not yet hitting their birthday
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    return --age;
  }
  return age;
}
