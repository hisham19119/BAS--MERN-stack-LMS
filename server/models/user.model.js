const mongoose = require("mongoose");
const userRoles = require("../utils/usersRoles");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "too short password"],
    },

    token: {
      type: String,
      default: undefined,
    },
    role: {
      type: String,
      enum: [userRoles.ADMIN, userRoles.TEACHER, userRoles.STUDENT],
      default: userRoles.STUDENT,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
