module.exports = (req, res, next) => {
  body = req.body;
  if (!body && body === {}) {
    res.status(400).json({ message: 'missing post data' });
    next();
  } else if (!body.user_id) {
    res.status(400).json({ message: 'missing required user id field' });
  } else if (!body.date) {
    res.status(400).json({ message: 'missing required date field' });
  } else if (!body.meal_type) {
    res.status(400).json({ message: 'missing required meal type field' });
  } else if (!body.edamam_food_id) {
    res.status(400).json({ message: 'missing required edamam food id field' });
  } else if (!body.measurement_uri) {
    res.status(400).json({ message: 'missing required measurement uri field' });
  } else if (!body.measurement_name) {
    res
      .status(400)
      .json({ message: 'missing required measurement name field' });
  } else if (!body.food_name) {
    res.status(400).json({ message: 'missing required food name field' });
  } else if (!body.quantity) {
    res.status(400).json({ message: 'missing required quantity field' });
  } else if (!body.calories_kcal) {
    res.status(400).json({ message: 'missing required calories_kcal field' });
  } else if (!body.fat_g) {
    res.status(400).json({ message: 'missing required fat_g field' });
  } else if (!body.carbs_g) {
    res.status(400).json({ message: 'missing required carbs_g field' });
  } else if (!body.protein_g) {
    res.status(400).json({ message: 'missing required protein_g field' });
  } else {
    next();
  }
};
