const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    timestamps: false
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.user_role = require("./user_role.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.story_genre = require("./story_genres.model.js")(sequelize, Sequelize);
db.story_language = require("./story_language.model.js")(sequelize, Sequelize);
db.story_role = require("./story_role.model.js")(sequelize, Sequelize);
db.story_country = require("./story_country.model.js")(sequelize, Sequelize);
db.bedtime_story = require("./bedtime_stories.model.js")(sequelize, Sequelize);

db.user.hasMany(db.session, { as: "sessions", foreignKey: "user_id" });
db.session.belongsTo(db.user, { as: "user", foreignKey: "user_id" });

db.user_role.hasMany(db.user, { as: "user", foreignKey: "role_id" });
db.user.belongsTo(db.user_role, { as: "user_role", foreignKey: "role_id" });

db.user.hasMany(db.bedtime_story, { as: "bedtime_story", foreignKey: "author_id"});
db.bedtime_story.belongsTo(db.user, { as: "user", foreignKey: "author_id" });

db.story_genre.hasMany(db.bedtime_story, { as: "bedtime_story", foreignKey: "story_genre_id" });
db.bedtime_story.belongsTo(db.story_genre, { as: "story_genre", foreignKey: "story_genre_id" });

db.story_country.hasMany(db.bedtime_story, { as: "bedtime_story", foreignKey: "story_country_id" });
db.bedtime_story.belongsTo(db.story_country, { as: "story_country", foreignKey: "story_country_id" });

db.story_role.hasMany(db.bedtime_story, { as: "bedtime_story", foreignKey: "story_role_id" });
db.bedtime_story.belongsTo(db.story_role, { as: "story_role", foreignKey: "story_role_id" });

db.story_language.hasMany(db.bedtime_story, { as: "bedtime_story", foreignKey: "story_language_id" });
db.bedtime_story.belongsTo(db.story_language, { as: "story_language", foreignKey: "story_language_id" });

module.exports = db;
