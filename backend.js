const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/skillswap", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Skill = require("./models/Skill");

app.post("/api/skills", async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get("/api/skills", async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});
app.put("/api/skills/:id", async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.patch("/api/skills/:id", async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/skills/:id", async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
