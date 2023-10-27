const Task = require("../models/task");

const addTask = (req, res) => {
  console.log(req.body);
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.status(201).json({
        model: task,
        message: "object créé ",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "erreur d'extraction ",
      });
    });
};

const getTask = (req, res) => {
  Task.find()
    .then((task) => {
      res.status(200).json({
        model: task,
        message: "success",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "erreur d'extraction ",
      });
    });
};

const getTaskById = (req, res) => {
  console.log(req.params.id);
  Task.findOne({ _id: req.params.id })
    .then((task) => {
      if (!task) {
        res.status(404).json({
          message: "objet non trouvé ",
        });
        return;
      }
      res.status(200).json({
        model: task,
        message: "objet trouvé",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "erreur d'extraction ",
      });
    });
};

const updateTask = (req, res) => {
  Task.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((task) => {
      if (!task) {
        res.status(404)({
          message: "Objet non trouvé",
        });
      }
      res.status(200).json({
        model: task,
        message: "Objet modifié",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "problème d'extraction ",
      });
    });
};
const deleteTask = (req, res) => {
  const taskId = req.params.id;
  Task.findByIdAndRemove(taskId)
    .then((deletedtask) => {
      if (deletedtask) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "task not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Failed to delete the task" });
    });
};

module.exports = {
  getTasks: getTask,
  addTask: addTask,
  getTaskById: getTaskById,
  updateTask: updateTask,
  deleteTask: deleteTask,
};
