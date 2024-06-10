module.exports = (app) => {
  const { createLanguage, getAllLanguages, getLanguageById, updateLanguage, deleteLanguage, deleteAllLanguages } = require("../controllers/story_language.controller.js");
  var languageRouter = require("express").Router();

  languageRouter.post("/languages/", createLanguage);
  languageRouter.get("/languages/", getAllLanguages);
  languageRouter.get("/languages/:id", getLanguageById);
  languageRouter.put("/languages/:id", updateLanguage);
  languageRouter.delete("/languages/:id", deleteLanguage);
  languageRouter.delete("/languages/", deleteAllLanguages);
  app.use("/", languageRouter);
};
