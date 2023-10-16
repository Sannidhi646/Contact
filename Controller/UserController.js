const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../mondel/userModel");
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          _id: user.id,
        },
      },
      process.env.SECERET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("Check the email and password");
  }
});
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
console.log(username)
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvable = await User.findOne({ email });

  if (userAvable) {
    res.status(400);
    throw new Error("User already register");
  }
  const hashpassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email: email,
    password: hashpassword,
  });
  res.json({ user });
  if (user) {
    res.status(201).json({ _id: user.id, name: user.name });
  } else {
    res.status(400);
    throw new Error("Unabale to create an account");
  }
});
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { loginUser, registerUser, currentUser };
