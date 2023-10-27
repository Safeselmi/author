const express = require("express");
const app = express();
const mongoose = require("mongoose");
const taskRoutes = require("./Routes/Task");
const bookRoutes = require("./Routes/Book");
const userRoutes = require("./Routes/User");
const authRouter = require("./Routes/Author");
const categoryRoutes = require("./Routes/Category");

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
app.use("/api/tasks", taskRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/authors", authRouter);
app.use("/api/categories", categoryRoutes);

module.exports = app;
