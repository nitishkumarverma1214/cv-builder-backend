const router = require("express").Router();
const passport = require("passport");
const User = require("../model/User");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: `${process.env.CLIENT_URL}`,
    failureRedirect: "/login/failed",
  }),
);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "user logined in",
      user: req.user,
    });
  }
});
router.get("/logout", (req, res) => {
  req.logout();
  // destroying the cookies session in client
  req.session = null;

  res.status(200).json({ message: "logout" });
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failed to login",
  });
});
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}`,
    failureRedirect: "/login/failed",
  }),
);

router.post(
  "/register",

  async (req, res) => {
    const { username, password, email, phone } = req?.body;

    if (!username || !password) {
      return res
        .status(401)
        .json({ message: "Email or password can't be blank" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      password: hashPassword,
      email,
      phone,
    });

    if (newUser) {
      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        token: generateToken(newUser._id.toString()),
      });
    }
  },
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: `${process.env.CLIENT_URL}/signup`,
  }),
  function (req, res) {
    // res.redirect(process.env.CLIENT_URL);

    res.send("success");
  },
);

module.exports = router;
