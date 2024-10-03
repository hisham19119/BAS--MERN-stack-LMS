require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const userRouter = require("./routes/user.routes");
const courseRouter = require("./routes/courses.routes");
const chapterRouter = require("./routes/chapters.routes");
const categoryRouter = require("./routes/categories.routes");
const path = require("path");
const bodyParser = require("body-parser");

app.use(cors());
dbConnection();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/chapters", chapterRouter);
app.use("/api/categories", categoryRouter);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
