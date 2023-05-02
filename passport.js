const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("./model/User");
const objectId = require("mongodb").ObjectId;
require("dotenv").config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const existingUser = await User.findOne({
          googleId: profile.id,
        });

        if (!existingUser) {
          const newUser = {
            googleId: profile?.id,
            username: profile?.name?.givenName,
          };
          const createdUser = await User.create(newUser);
          return done(null, createdUser);
        }

        return done(null, existingUser);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const existingUser = await User.findOne({
          facebookId: profile.id,
        });

        if (!existingUser) {
          const newUser = {
            googleId: profile?.id,
            // use username if it is valid else use displayName
            username: profile?.username ?? profile?.displayName,
          };
          const createdUser = await User.create(newUser);
          done(null, createdUser);
        }

        done(null, existingUser);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({
        $or: [{ username: username }, { email: username }],
      });
      if (!user) {
        return done(null, false);
      }

      const validatePassword = await user.verifyPassword(password);
      if (!validatePassword) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const savedUser = await User.findOne({ _id: id });
    cb(null, savedUser);
  } catch (error) {
    cb(error, false);
  }
});
