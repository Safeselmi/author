const Book = require("../models/Book");

const addBook = (req, res) => {
  console.log(req.body);
  const book = new Book(req.body);
  book
    .save()
    .then(() => {
      res.status(201).json({
        model: Book,
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

const getBook = (req, res) => {
  Book.find()
    .then((Book) => {
      res.status(200).json({
        model: Book,
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

const getBookById = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .populate("author")
    .then((Book) => {
      if (!Book) {
        res.status(404).json({
          message: "objet non trouvé ",
        });
        return;
      }
      res.status(200).json({
        model: Book,
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

const updateBook = (req, res) => {
  Book.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((Book) => {
      if (!Book) {
        res.status(404)({
          message: "Objet non trouvé",
        });
      }
      res.status(200).json({
        model: Book,
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
const deleteBook = (req, res) => {
  const BookId = req.params.id;
  Book.findByIdAndRemove(BookId)
    .then((deletedBook) => {
      if (deletedBook) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting Book:", error);
      res.status(500).json({ error: "Failed to delete the Book" });
    });
};

module.exports = {
  getBook: getBook,
  addBook: addBook,
  getBookById: getBookById,
  updateBook: updateBook,
  deleteBook: deleteBook,
};
