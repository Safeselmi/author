const express = require("express");
const router = express.Router();
const book = require("../models/Book");
const bookController = require("../Controllers/Book");

router.post("/", bookController.addBook);

router.get("/", bookController.getBook);

router.get("/:id", bookController.getBookById);

router.patch("/:id", bookController.updateBook);

router.delete("/:id", bookController.deleteBook);

router.get("/author/:id", bookController.findBooks);
module.exports = router;
