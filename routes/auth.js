const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");
const router = express.Router();

router.post("/register", async (req, res) => {
  let model = req.body;
  if (model.name && model.email && model.password) {
    // Register user in database
    await registerUser(model);
    res.send({ message: "User registered successfully" });
  } else {
    res.status(400).jason({
      error: "Please provide name, email and password",
    });
  }
});

router.post("/login", async (req, res) => {
  let model = req.body;
  if (model.email && model.password) {
    // Login user
    const result = await loginUser(model);
    if (result) {
      res.send(result);
    } else {
      res.status(400).json({
        error: "email and password is incorrect",
      });
    }
  } else {
    res.status(400).json({
      error: "Please provide email and password",
    });
  }
});

module.exports = router;
