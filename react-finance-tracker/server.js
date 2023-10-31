require("dotenv").config();

const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const passportSetup = require("./middleware/passport");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const conn = require("./config/db");
const cookieParser = require("cookie-parser");

const path = require("path");
app.use(logger);
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
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK!");
});

app.use("/auth", require("./routes/authRoute"));
app.use("/api/v1/user", require("./routes/userRoute"));

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "404 Not Found" });
});

app.use(errorHandler);

conn
  .sync()
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    logEvents(`${err}`, "dbErr.log");
  });
