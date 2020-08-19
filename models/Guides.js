var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

var guidesSchema = mongoose.Schema({
  name: String,
  contact: Number,
  cnic: String,

  residence: String,
  email: String,
});

var GuidesModel = mongoose.model("GuidesModel", guidesSchema);

function validateGuide(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10),
    contact: Joi.number(),
    cnic: Joi.string().min(3).max(13),

    residence: Joi.string().min(3).max(50),
    email: Joi.string().email().min(3).max(50),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.GuidesModel = GuidesModel;
module.exports.validateGuide = validateGuide;
