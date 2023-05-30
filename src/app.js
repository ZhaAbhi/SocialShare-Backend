const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const jwt = require("jsonwebtoken");
const { findUserByName, saveGithubLoginUser } = require("./models/user.model");
const { authenticatedUser } = require("./middlewares/auth");
const userRouter = require("./routes/user.router");
require("dotenv").config();
const users = require("./models/user.mongo");
const fs = require("fs");
const path = require("path");
const { error } = require("console");

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
        await saveGithubLoginUser({ name, githubId: id });
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

app.get("/", authenticatedUser, async (req, res) => {
  const user = req.user;
  const getUser = await users.findOne({ githubId: user.id }).select("-__v");
  return res.status(200).json(getUser);
});

// app.get("/image", (req, res) => {
//   fs.readFile("./uploads/baca55b76186b60483967e1ee8eb8acf", (err, data) => {
//     res.setHeader("Content-Type", "image/jpeg");
//     res.send(data);
//   });
// });

app.use(userRouter);

module.exports = app;
