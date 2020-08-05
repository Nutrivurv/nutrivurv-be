const db = require('../../db/config');
const calcSummedTotals = require('../helpers/calcSummedTotals');

const update = async (log, trx) => {
  const dailyTotals = await getDailyTotals(log.date, log.user_id, trx);
  const updatedTotals = calcSummedTotals(dailyTotals, log);

  return db('daily_totals as dt')
    .transacting(trx)
    .returning('*')
    .update(updatedTotals)
    .where({ 'dt.user_id': log.user_id, 'dt.date': log.date });
};

const getDailyTotals = async (date, user_id, trx) => {
  let dailyTotals = await db('daily_totals as dt')
    .transacting(trx)
    .select('*')
    .where({ date, user_id })
    .first();

  if (!dailyTotals) {
    [dailyTotals] = await db('daily_totals as dt')
      .transacting(trx)
      .returning('*')
      .insert({
        date,
        user_id,
      });
  }

  return dailyTotals;
};

module.exports = {
  update,
};
