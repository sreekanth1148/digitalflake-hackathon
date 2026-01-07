const express = require("express");
const router = express.Router();
const Set = require("../models/Set");
const auth = require("../middleware/authMiddleware");

// Get all sets
router.get("/", auth, async (req, res) => {
  const sets = await Set.find({ userId: req.user.id });
  res.json(sets);
});

// Add set
router.post("/", auth, async (req, res) => {
  const newSet = new Set({
    name: req.body.name,
    userId: req.user.id
  });

  await newSet.save();
  res.json(newSet);
});

// Delete set
router.delete("/:id", auth, async (req, res) => {
  await Set.findByIdAndDelete(req.params.id);
  res.json({ message: "Set deleted" });
});

module.exports = router;
