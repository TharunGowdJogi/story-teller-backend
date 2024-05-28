module.exports = (sequelize, DataTypes) => {
    const StoryGenre = sequelize.define("story_genre", {
      genre_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      genre_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });
  
    return StoryGenre;
  };
  