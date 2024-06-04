module.exports = (app) => {
    const { getAllCountries } = require("../controllers/story_country.controller.js");
    var countryRouter = require("express").Router();
  
    countryRouter.get("/countries/", getAllCountries);
    app.use("/", countryRouter);
  };
  