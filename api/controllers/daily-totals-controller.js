const db = require('../../db/config');
const calcDailyTotals = require('../helpers/calcDailyTotals');

/********************************************************
 *                  REFRESH DAILY TOTALS                 *
 ********************************************************/
const refresh = async (user_id, date, trx) => {
  return db('log_entry as le')
    .transacting(trx)
    .join('user as u', 'u.id', 'le.user_id')
    .select(
      'le.user_id',
      'le.date',
      'le.calories_kcal',
      'le.fat_g',
      'le.carbs_g',
      'le.protein_g'
    )
    .where({ 'le.date': date, 'le.user_id': user_id })
    .then(async (logEntries) => {
      const dailyTotals = await getByDate(user_id, date, trx);

      if (!dailyTotals.length) await create(user_id, date, trx);

      return logEntries;
    })
    .then(async (logEntries) => {
      const dailyTotals = calcDailyTotals(logEntries);
      return await update(dailyTotals, user_id, date, trx);
    });
};

const update = (dailyTotals, user_id, date, trx) => {
  return db('daily_totals as dt')
    .returning('*')
    .transacting(trx)
    .update({
      total_calories_kcal: dailyTotals.calories_kcal,
      total_fat_g: dailyTotals.fat_g,
      total_carbs_g: dailyTotals.carbs_g,
      total_protein_g: dailyTotals.protein_g,
    })
    .where({ 'dt.user_id': user_id, 'dt.date': date });
};

const create = (user_id, date, trx) => {
  return db('daily_totals as dt').returning('*').transacting(trx).insert({
    user_id,
    date,
  });
};

/********************************************************
 *                    GET DAILY TOTALS                   *
 ********************************************************/
const getByDate = async (user_id, date, trx) => {
  return db('daily_totals as dt')
    .transacting(trx)
    .select('*')
    .where({ 'dt.user_id': user_id, 'dt.date': date });
};

module.exports = {
  update,
  refresh,
  getByDate,
};
