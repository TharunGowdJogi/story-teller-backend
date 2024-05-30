module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define("user_role", {
      role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    });
  
    return UserRole;
  };
  