module.exports = (sequelize, DataTypes) => {
    const BedtimeStory = sequelize.define("bedtime_story", {
      story_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    return BedtimeStory;
  };
  