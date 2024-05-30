module.exports = (sequelize, DataTypes) => {
    const StoryCountry = sequelize.define("story_country", {
      country_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      country_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    });
  
    return StoryCountry;
  };
  