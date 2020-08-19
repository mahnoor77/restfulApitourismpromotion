const { validateGuide } = require("../models/Guides");
function validateGuides(req, res, next) {
  let { error } = validateGuide(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
module.exports = validateGuides;
