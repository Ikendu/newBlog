const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, min: 4 },
    email: { type: String, required: true, min: 5, uniq: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;

//33AvNrvMD2pajN2l
//mongodb+srv://blog:33AvNrvMD2pajN2l@cluster0.8fgl6wb.mongodb.net/?retryWrites=true&w=majority
