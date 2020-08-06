const calcDailyTotals = (logEntries) => {
  if (!logEntries.length) {
    return {
      calories_kcal: 0,
      fat_g: 0,
      carbs_g: 0,
      protein_g: 0,
    };
  }

  // creates runningTotal of all nutrients
  // rounding each to precision 1
  return logEntries.reduce((log, runningTotals) => ({
    calories_kcal:
      Math.round(
        (Number(log.calories_kcal) + Number(runningTotals.calories_kcal)) * 10
      ) / 10,
    fat_g:
      Math.round((Number(log.fat_g) + Number(runningTotals.fat_g)) * 10) / 10,
    carbs_g:
      Math.round((Number(log.carbs_g) + Number(runningTotals.carbs_g)) * 10) /
      10,
    protein_g:
      Math.round(
        (Number(log.protein_g) + Number(runningTotals.protein_g)) * 10
      ) / 10,
  }));
};

module.exports = calcDailyTotals;
