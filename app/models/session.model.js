module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("session", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Session;
};
