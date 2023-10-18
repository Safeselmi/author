const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require("./models/Book");
mongoose
  .connect("mongodb://localhost:27017/Books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à mongoDB... reussite"))
  .catch((e) => console.log("connexion à mongodb échouée", e));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader(
    "Acces-Control-Allow-Header",
    "Origin, X-Requested-With, Content, Accept, Content-Type ,Authorization"
  );
  res.setHeader(
    "Acces-Control-Allow-Methods",
    "GET, POST, PUT , DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post("/api/books", (req, res) => {
  console.log(req.body);
  const book = new Book(req.body);
  book
    .save()
    .then(() => {
      res.status(201).json({
        model: book,
        message: "object créé ",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "erreur d'extraction ",
      });
    });
});

app.get("/api/books", (req, res) => {
  Book.find()
    .then((books) => {
      res.status(200).json({
        model: books,
        message: "success",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "erreur d'extraction ",
      });
    });
});

app.get("/api/books/:id", (req, res) => {
  console.log(req.params.id);
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        res.status(404).json({
          message: "objet non trouvé ",
        });
        return;
      }
      res.status(200).json({
        model: book,
        message: "objet trouvé",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "erreur d'extraction ",
      });
    });
});

app.patch("/api/books/:id", (req, res) => {
  Book.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((book) => {
      if (!book) {
        res.status(404)({
          message: "Objet non trouvé",
        });
      }
      res.status(200).json({
        model: book,
        message: "Objet modifié",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "problème d'extraction ",
      });
    });
});

app.delete("/api/books/:id", (req, res) => {
  const bookId = req.params.id;
  Book.findByIdAndRemove(bookId)
    .then((deletedBook) => {
      if (deletedBook) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting book:", error);
      res.status(500).json({ error: "Failed to delete the book" });
    });
});

/*app.delete("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    // Use Mongoose to delete the book by its ID
    const deletedBook = await Book.findByIdAndRemove(bookId);

    if (deletedBook) {
      // Book deleted successfully
      res.status(204).send();
    } else {
      // Book not found, send a 404 (Not Found) response
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete the book" });
  }
});
*/

module.exports = app;
/*const Task = require("./models/task");
mongoose
  .connect("mongodb://localhost:27017/Tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à mongoDB... reussite"))
  .catch((e) => console.log("connexion à mongodb échouée", e));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader(
    "Acces-Control-Allow-Header",
    "Origin, X-Requested-With, Content, Accept, Content-Type ,Authorization"
  );
  res.setHeader(
    "Acces-Control-Allow-Methods",
    "GET, POST, PUT , DELETE, PATCH, OPTIONS"
  );
  next();
});
app.get("/api/tasks", (req, res, next) => {
  const todos = [
    {
      _id: "1",
      title: "learn js",
      duration: "30",
    },
    {
      _id: "2",
      title: "learn nodejs",
      duration: "40",
    },
    {
      _id: "3",
      title: "learn react",
      duration: "60",
    },
  ];

  res.status(200).json(todos);
});
app.get("/api/tasks", (req, res) => {
  console.log(req.params.id);
  Task.find()
    .then((tasks) => {
      res.status(200).json({
        model: tasks,
        message: "success",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "erreur d'extraction ",
      });
    });
});

app.get("/api/tasks/:id", (req, res) => {
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
});

app.post("/api/tasks", (req, res) => {
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
});

app.patch("/api/tasks/:id", (req, res) => {
  Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    (task) => {
      if (!task) {
        res.status(404)({
          message: "Objet non trouvé",
        });
      } else
        res
          .status(200)
          .json({
            model: task,
            message: "Objet modifié",
          })
          .catch((error) => {
            res.status(400).json({
              error: error.message,
              message: "problème d'extraction ",
            });
          });
    }
  );
  res.send(req.body);
});
app.delete("/api/tasks/:id", (req, res) => {
  console.log(req.params.id);
  res.send(req.body.id);
});

module.exports = app;
*/
