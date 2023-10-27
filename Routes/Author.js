const express = require("express");
const router = express.Router();
const auth = require("../models/Author");
const authController = require("../Controllers/Author");

router.post("/", authController.addAuthor);
module.exports = router;
