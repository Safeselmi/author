const author = require("../models/Author");

const addAuthor = (req, res) => {
  const auth = new author(req.body);
  auth
    .save()
    .then(() => {
      res.status(201).json({
        model: auth,
        message: "author créé ",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
        message: "erreur d'extraction",
      });
    });
};
module.exports = {
  addAuthor: addAuthor,
};
