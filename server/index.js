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

const allowedOrigins = [
  "https://lms-mern-stack-client-gif3m4zun-hisham19119s-projects.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cors());
dbConnection();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/chapters", chapterRouter);
app.use("/api/categories", categoryRouter);

app.get("/", (req, res) => res.send("Express on Vercel"));
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
