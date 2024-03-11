const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "User name not provided"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Invalid email"],
  },
  docs: [mongoose.Types.ObjectId],
  password: {
    type: String,
    required: [true, "Password not provided"],
  },
  passwordConfirm: {
    type: String,
      required: [true, "PasswordConfirm not provided"],
      validate: {
          validator: function (el) {
              el === this.password;
          },
          message:'PasswordConfirm does not matches Password'
    }
  },
});

userSchema.pre("save", async function (next) {

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});;
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;