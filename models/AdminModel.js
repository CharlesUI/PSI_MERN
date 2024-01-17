const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Fill out name field"],
    minlength: 4,
    maxlength: 20,
    unique: true
  },

  email: {
    type: String,
    required: [true, "Fill out email field"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Fill out email field",
    ],
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "main_admin"],
    default: "admin",
  },
  password: {
    type: String,
    required: [true, "Fill out password field"],
    minlength: 6,
  },
}, { timestamps: true });

AdminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

AdminSchema.methods.createToken = function () {
  const token = jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return token
};

//Admin method for logging in
AdminSchema.methods.isMatch = async function(password){
    const isCorrect = await bcrypt.compare(password, this.password)
    return isCorrect
}

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
