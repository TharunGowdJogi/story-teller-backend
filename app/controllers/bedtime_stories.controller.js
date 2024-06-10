const db = require("../models");
const BedtimeStory = db.bedtime_story;
const User = db.user;
const StoryGenre = db.story_genre;
const StoryLanguage = db.story_language;
const StoryRole = db.story_role;
const StoryCountry = db.story_country;
const { CohereClient } = require('cohere-ai');

require('dotenv').config();

const cohereKey = process.env.COHERE_KEY || "";

const cohere = new CohereClient({
  token: cohereKey,
})

// Create and Save a new Bedtime Story
exports.createStory = async (req, res) => {
  try {
    const { user_id, genre_id, language_id, role_id, country_id, title } = req.body;

    // Validate user_id is provided
    if (!user_id) {
      throw new Error("user_id is required.");
    }

    // Validate that the user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      throw new Error("User not found.");
    }

    // Check if provided optional fields exist in the database
    let genre, language, role, country;

    if (genre_id) {
      genre = await StoryGenre.findByPk(genre_id);
      if (!genre) throw new Error("Genre not found.");
    }

    if (language_id) {
      language = await StoryLanguage.findByPk(language_id);
      if (!language) throw new Error("Language not found.");
    }

    if (role_id) {
      role = await StoryRole.findByPk(role_id);
      if (!role) throw new Error("Role not found.");
    }

    if (country_id) {
      country = await StoryCountry.findByPk(country_id);
      if (!country) throw new Error("Country not found.");
    }

    // Create a prompt for the Cohere AI tool
    let prompt = `Craft a narrative`;
    if (genre) prompt += ` that falls under the genre of ${genre.genre_name}`;
    if (language) prompt += `, written in ${language.language_name}`;
    if (role) prompt += `, featuring the role of ${role.role_name}`;
    if (country) prompt += `, taking place in ${country.country_name}`;
    prompt += ". Please provide a straightforward story, without an AI response style!";    

    // Use Cohere AI tool to generate the story text
    const response = await cohere.generate({
      model: "command",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.8,
    });

    console.log("response",JSON.stringify(response))
    if (!response.generations || response.generations.length === 0) {
      throw new Error("Failed to generate story content.");
    }

    const generatedText = response.generations[0].text.replace("\n","");

    // Create a Bedtime Story object
    const story = {
      author_id: user_id,
      story_genre_id: genre_id,
      text: generatedText,
      story_language_id: language_id,
      story_role_id: role_id,
      story_country_id: country_id,
      title
    };

    // Save Bedtime Story in the database
    const data = await BedtimeStory.create(story);
    res.send(data);
  } catch (err) {
    console.log("create story Error: ",err)
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Bedtime Story.",
    });
  }
};


// Retrieve all Bedtime Stories from the database.
exports.getAllStories = (req, res) => {
  const { language_id, genre_id, country_id, role_id, title, author_id } = req.query;

  let condition = {};

  if (language_id) {
    condition.story_language_id = language_id;
  }

  if (genre_id) {
    condition.story_genre_id = genre_id;
  }

  if (country_id) {
    condition.story_country_id = country_id;
  }

  if (role_id) {
    condition.story_role_id = role_id;
  }

  if(author_id) {
    condition.author_id = author_id;
  }

  if (title) {
    condition.title = { [Op.like]: `%${title}%` };
  }

  BedtimeStory.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("get all Stories Error: ",err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stories.",
      });
    });
};

// Find a single Bedtime Story with an id
exports.getStoryById = (req, res) => {
const id = req.params.id;

BedtimeStory.findByPk(id,{
  include: [
    { model: StoryGenre, as: 'story_genre' },
    { model: StoryCountry, as: 'story_country' },
    { model: StoryRole, as: 'story_role' },
    { model: StoryLanguage, as: 'story_language' },
  ]
})
  .then((data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Bedtime Story with id = ${id}.`,
      });
    }
  })
  .catch((err) => {
    console.log("get story by Id Error: ",err)
    res.status(500).send({
      message: err.message || "Error retrieving Bedtime Story with id = " + id,
    });
  });
};

// Update a Bedtime Story by the id in the request
exports.updateStory = (req, res) => {
  const id = req.params.id;

  BedtimeStory.update(req.body, {
    where: { story_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Bedtime Story was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Bedtime Story with id = ${id}. Maybe Bedtime Story was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Bedtime Story with id = " + id,
      });
    });
};

// Delete a Bedtime Story with the specified id in the request
exports.deleteStory = (req, res) => {
  const id = req.params.id;

  BedtimeStory.destroy({
    where: { story_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Bedtime Story was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Bedtime Story with id = ${id}. Maybe Bedtime Story was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Bedtime Story with id = " + id,
      });
    });
};

// Delete all Bedtime Stories from the database.
exports.deleteAllStories = (req, res) => {
  BedtimeStory.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Bedtime Stories were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all stories.",
      });
    });
};


