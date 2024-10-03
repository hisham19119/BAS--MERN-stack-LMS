const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://lms-mern-stack-client-gif3m4zun-hisham19119s-projects.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE , PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next(); // Proceed to the next middleware/route handler
};

// Use CORS middleware for all routes in this router
router.use(cors);

router.route("/").get(userController.getAllUsers).post(authController.register);
router
  .route("/:id")
  .get(userController.getSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);

module.exports = router;
