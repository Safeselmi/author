const express = require("express");
const router = express.Router();
const category = require("../models/Category");
const categoryControllers = require("../Controllers/Category");

router.post("/", categoryControllers.addCategory);
module.exports = router;
