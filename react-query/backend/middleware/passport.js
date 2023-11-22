const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRETS = process.env.GITHUB_CLIENT_SECRETS;

const User = require("../model/User");
const { encryptPassword } = require("../utils/helper");
const { v4: uuid } = require("uuid");

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRETS,
      callbackURL: "/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const existingUser = await User.findOne({
        where: {
          username: profile.username,
        },
      });

      if (!existingUser) {
        await User.create({
          username: profile.username,
          displayName: profile.displayName,
          email: profile._json.email,
          password: await encryptPassword(uuid()),
          photo: profile._json.avatar_url,
        });
      }

      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
