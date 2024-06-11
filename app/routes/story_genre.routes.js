module.exports = (app) => {
  const { createGenre, getAllGenres, getGenreById, updateGenre, deleteGenre, deleteAllGenres } = require("../controllers/story_genre.controller.js");
  var genreRouter = require("express").Router();

  genreRouter.post("/genres/", createGenre);
  genreRouter.get("/genres/", getAllGenres);
  genreRouter.get("/genres/:id", getGenreById);
  genreRouter.put("/genres/:id", updateGenre);
  genreRouter.delete("/genres/:id", deleteGenre);
  genreRouter.delete("/genres/", deleteAllGenres);
  app.use("/", genreRouter);
};
