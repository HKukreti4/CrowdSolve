const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middleware/error.middlewre");
const authRoutes = require("./routes/auth.routes");
const connectDb = require("./config/db.config");
dotenv.config();
const app = express();
app.use(cors({
  origin: true,
  credentials: true
}

));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDb();

app.use("/api/v1/auth", authRoutes)

app.use(errorMiddleware);
app.listen(process.env.PORT || 5000, () => {
  console.log("server connected ", process.env.PORT);
});