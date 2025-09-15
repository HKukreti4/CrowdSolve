const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middleware/error.middlewre");
const authRoutes = require("./routes/auth.routes");
const connectDb = require("./config/db.config");
const problemRoutes = require("./routes/problem.routes");
const solutionRoutes = require("./routes/solution.routes");
dotenv.config();
const app = express();
app.use(cors({
  origin: ["https://crowd-solve-sooty.vercel.app",],
  credentials: true
}

));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
connectDb();
app.get("/", (req, res) => {
  res.send("succesfully deployed")
})
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1", problemRoutes)
app.use("/api/v1/solution", solutionRoutes)


app.use(errorMiddleware);
app.listen(process.env.PORT || 5000, () => {
  console.log("server connected ", process.env.PORT);
});