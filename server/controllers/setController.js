const Set = require("../models/Set");

exports.getSets = async (req, res) => {
  res.json(await Set.find());
};

exports.createSet = async (req, res) => {
  res.json(await Set.create(req.body));
};

exports.updateSet = async (req, res) => {
  res.json(await Set.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.deleteSet = async (req, res) => {
  await Set.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};
