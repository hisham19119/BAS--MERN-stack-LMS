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
const router = express.Router();

// const cors = (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE , PATCH"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   // Handle preflight requests
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   next(); // Proceed to the next middleware/route handler
// };

// Use CORS middleware for all routes in this router
// router.use(cors);

app.use(
  cors({
    origin:
      "https://lms-mern-stack-client-gif3m4zun-hisham19119s-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    // allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// app.use(cors());
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
