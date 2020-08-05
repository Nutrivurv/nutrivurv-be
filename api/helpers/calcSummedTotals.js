module.exports = (dailyTotals, log) => {
  return {
    total_calories_kcal:
      Number(dailyTotals.total_calories_kcal) + Number(log.calories_kcal),
    total_fat_g: Number(dailyTotals.total_fat_g) + Number(log.fat_g),
    total_carbs_g: Number(dailyTotals.total_carbs_g) + Number(log.carbs_g),
    total_protein_g:
      Number(dailyTotals.total_protein_g) + Number(log.protein_g),
  };
};
