module.exports = (sequelize, DataTypes) => {
    const StoryRole = sequelize.define("story_role", {
      role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });
  
    return StoryRole;
  };
  