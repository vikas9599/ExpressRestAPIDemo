const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    min: 2,
    max: 60,
    required: true,
  },

  lastName: { type: String, min: 2, max: 60 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
});
module.exports = mongoose.model("Users", UserSchema);
