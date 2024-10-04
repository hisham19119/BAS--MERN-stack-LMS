const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

// res.setHeader(
//   "Access-Control-Allow-Origin",
//   "https://lms-mern-stack-client-9zm3z7det-hisham19119s-projects.vercel.app"
// );
// res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
// res.setHeader("Access-Control-Allow-Headers", "Content-Type");

// // Handle preflight request
// if (req.method === "OPTIONS") {
//   return res.status(200).end();
// }

// // Your logic for handling other request methods

// // Handle other HTTP methods as necessary
// res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE", "PATCH"]);
// res.status(405).end(`Method ${req.method} Not Allowed`);

router.route("/").get(userController.getAllUsers).post(authController.register);
router
  .route("/:id")
  .get(userController.getSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);

module.exports = router;
