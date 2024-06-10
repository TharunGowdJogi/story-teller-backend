module.exports = (app) => {
  const { createCountry, getAllCountries, getCountryById, updateCountry, deleteCountry, deleteAllCountries } = require("../controllers/story_country.controller.js");
  var countryRouter = require("express").Router();

  countryRouter.post("/countries/", createCountry);
  countryRouter.get("/countries/", getAllCountries);
  countryRouter.get("/countries/:id", getCountryById);
  countryRouter.put("/countries/:id", updateCountry);
  countryRouter.delete("/countries/:id", deleteCountry);
  countryRouter.delete("/countries/", deleteAllCountries);
  app.use("/", countryRouter);
};
