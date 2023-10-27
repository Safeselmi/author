const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/Task");
const auth = require("../middlewares/Auth");

router.post("/", auth.loggedMiddleware, taskController.addTask);

router.get("/", auth.loggedMiddleware, taskController.getTasks);

router.get("/:id", auth.loggedMiddleware, taskController.getTaskById);

router.patch(
  "/:id",
  auth.loggedMiddleware,
  auth.isAdmin,
  taskController.updateTask
);

router.delete("/:id", auth.loggedMiddleware, taskController.deleteTask);
module.exports = router;
