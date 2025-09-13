const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hashedPass = await bcrypt.hash(this.password, 10);
  this.password = hashedPass;
  next();
});

 const User = mongoose.model("User", UserSchema);
 module.exports=User