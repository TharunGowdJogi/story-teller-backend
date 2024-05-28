module.exports = (sequelize, DataTypes) => {
    const StoryLanguage = sequelize.define("story_language", {
      language_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      language_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });
  
    return StoryLanguage;
  };
  