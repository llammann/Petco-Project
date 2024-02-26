const express = require("express");
const router = express.Router();
const UserController = require("./../controllers/UserController");
router.get("/users", UserController.getAllUsers);
router.delete("/users/:id", UserController.deleteUser);
router.post("/users", UserController.postUser);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.putUser);
router.patch("/users/:id", UserController.patchUser);

module.exports = router;
