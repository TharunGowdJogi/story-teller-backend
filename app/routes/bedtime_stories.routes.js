module.exports = (app) => {
    const { createStory, getAllStories, getStoryById } = require("../controllers/bedtime_stories.controller.js");
    var bedtimeStoryRouter = require("express").Router();
  
    bedtimeStoryRouter.post("/stories/", createStory);
    bedtimeStoryRouter.get("/stories/", getAllStories);
    bedtimeStoryRouter.get("/stories/:id", getStoryById);
    app.use("/", bedtimeStoryRouter);
  };
  