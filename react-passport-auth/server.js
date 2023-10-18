require("dotenv").config();

const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const passportSetup = require("./middleware/passport");

const path = require("path");

app.use(
  cookieSession({
    name: "session",
    keys: ["passport"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));

app.use(express.static(path.join(path.resolve(), "client/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(path.resolve(), "client/dist", "index.html"));
});

app.use("/auth", require("./routes/authRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
