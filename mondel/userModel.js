const mongoose = require("mongoose");

const userScheme = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter the name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the Email"],
    },
    password: {
      type: String,
      required: [true, "Please enter the User Password"],
    },
  },
  {
    timeStamp: true,
  }
);

module.exports=mongoose.model("User",userScheme);