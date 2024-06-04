module.exports = (app) => {
    const { getAllLanguages } = require("../controllers/story_language.controller.js");
    var languageRouter = require("express").Router();
  
    languageRouter.get("/languages/", getAllLanguages);
    app.use("/", languageRouter);
  };
  