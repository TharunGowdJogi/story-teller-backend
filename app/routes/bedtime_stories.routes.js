module.exports = (app) => {
  const { createStory, getAllStories, getStoryById, updateStory, deleteStory, deleteAllStories, getRecommendations } = require("../controllers/bedtime_stories.controller.js");
  var bedtimeStoryRouter = require("express").Router();

  bedtimeStoryRouter.post("/stories/", createStory);
  bedtimeStoryRouter.get("/stories/", getAllStories);
  bedtimeStoryRouter.get("/stories/recommendations/:userId", getRecommendations);
  bedtimeStoryRouter.get("/stories/:id", getStoryById);
  bedtimeStoryRouter.put("/stories/:id", updateStory);
  bedtimeStoryRouter.delete("/stories/:id", deleteStory);
  bedtimeStoryRouter.delete("/stories/", deleteAllStories);
  app.use("/", bedtimeStoryRouter);
};
