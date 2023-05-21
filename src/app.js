const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const jwt = require("jsonwebtoken");
const { findUserByName, saveGithubLoginUser } = require("./models/user.model");
const { authenticatedUser } = require("./middlewares/auth");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const GITHUB_CALLBACK = process.env.GITHUB_CALLBACK;

let generatedToken = null;
passport.use(
  new GitHubStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK,
    },
    async function (accessToken, refreshToken, profile, done) {
      const name = profile.displayName;
      const id = profile.id;
      const getUser = await findUserByName(name);
      if (!getUser) {
        await saveGithubLoginUser({ name });
      }
      generatedToken = jwt.sign({ id, name }, JWT_SECRET);
      if (generatedToken !== null) {
        console.log(generatedToken);
        return done(null, generatedToken);
      }
    }
  )
);

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "socialshare://register",
  }),
  function (req, res) {
    const token = generatedToken;
    res.redirect(`socialshare://login/${token}`);
  }
);

app.get("/", authenticatedUser, (req, res) => {
  const user = req.user;
  console.log("user", user);
  return res.status(200).json(user);
});

module.exports = app;
