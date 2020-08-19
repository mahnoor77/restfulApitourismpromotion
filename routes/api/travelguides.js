const express = require("express");
let router = express.Router();
const validateGuides = require("../../middlewares/validateGuides");
const auth = require("../../middlewares/Auth");
const admin = require("../../middlewares/admin");
var { GuidesModel } = require("../../models/Guides");

router.get("/", async (req, res) => {
  console.log(req.user);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perpage ? req.query.perpage : 10);
  let skipRecords = perPage * (page - 1);
  let guide = await GuidesModel.find().skip(skipRecords).limit(perPage);
  let total = await GuidesModel.countDocuments();
  return res.send(guide);
});
router.get("/:id", async (req, res) => {
  try {
    let guide = await GuidesModel.findById(req.params.id);
    if (!guide) return res.status(404).send("id not found");
    return res.send(guide);
  } catch (err) {
    return res.status(404).send("Invalid Id");
  }
});
router.put("/:id",auth,admin, validateGuides, async (req, res) => {
  let guide = await GuidesModel.findById(req.params.id);
  guide.name = req.body.name;
  guide.contact = req.body.contact;
  guide.cnic = req.body.cnic;

  guide.residence = req.body.residence;
  guide.email = req.body.email;
  await guide.save();
  return res.send(guide);
});

router.delete("/:id",auth, async (req, res) => {
  let guide = await GuidesModel.findByIdAndDelete(req.params.id);
  return res.send(guide);
});
router.post("/", auth,admin,async (req, res) => {
  let guide = new GuidesModel();
  guide.name = req.body.name;
  guide.contact = req.body.contact;
  guide.cnic = req.body.cnic;

  guide.residence = req.body.residence;
  guide.email = req.body.email;
  await guide.save();
  return res.send(guide);
});
module.exports = router;
