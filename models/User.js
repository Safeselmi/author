const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const opts = { toObject: { virtuals: true }, toJSON: { virtuals: true } };

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
    },
  },
  opts
);

userSchema.plugin(uniqueValidator);
userSchema.methods.toPublic = function () {
  const userObject = this.toObject();
  // const userObject = this
  delete userObject.password;
  // userObject.publicName = userObject.name;
  console.log(userObject.name);
  return userObject;
};

userSchema.virtual("name").get(function () {
  return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model("User", userSchema);
