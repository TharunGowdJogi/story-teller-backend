module.exports = (app) => {
    const { getAllGenres } = require("../controllers/story_genre.controller.js");
    var genreRouter = require("express").Router();
  
    genreRouter.get("/genres/", getAllGenres);
    app.use("/", genreRouter);
  };
  