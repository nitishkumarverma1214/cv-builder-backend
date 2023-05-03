require("dotenv").config();
const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const uploadRoute = require("./routes/upload");
const PORT = 5000;
const passportSetup = require("./passport");
const expressSession = require("express-session");
const connectDB = require("./config/db");
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,DELETE,PUT",
    credentials: true,
  }),
);
app.use(
  cookieSession({
    name: "session",
    keys: ["cvbuilder"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
);
app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/upload", uploadRoute);
app.get("/user", (req, res) => {
  res.send(req.user);
});
app.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`);
});
