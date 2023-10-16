const mongoose = require("mongoose");

const constScheme = mongoose.Schema(
  {
    user_id:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"
    },
    name: {
      type: String,
      required: [true, "Please enter the name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the Email"],
    },
    phone: {
      type: Number,
      required: [true, "Please enter the Phone Number"],
    },
  },
  {
    timeStamp: true,
  }
);

module.exports=mongoose.model("Contact",constScheme);