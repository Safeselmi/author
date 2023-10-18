const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pagesNumber: { type: Number, required: true },
  publishingDate: { type: Date, required: true },
  ISBN: { type: String, required: true },
  price: { type: Number, required: true },
});
module.exports = mongoose.model("Book", bookSchema);
