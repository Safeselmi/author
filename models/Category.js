const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    enum: [
      "Horror",
      "Mystery",
      "Science Fiction",
      "Fantasy",
      "Romance",
      "Non-Fiction",
      "Other",
    ],
  },
});
module.exports = mongoose.model("Category", categorySchema);
