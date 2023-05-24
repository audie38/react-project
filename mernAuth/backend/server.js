import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import sequelize from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("OK!");
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

sequelize
  .sync()
  .then((res) => {
    console.log("Connected to DB...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
