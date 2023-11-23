const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});
bookSchema.statics.findByAuthor = function (authorId) {
  return this.find({ author: authorId });
};
bookSchema.plugin(idValidator);

bookSchema.path("title").validate(function (value) {
  return value.length > 0;
}, "Title cannot be empty");

module.exports = mongoose.model("Book", bookSchema);
