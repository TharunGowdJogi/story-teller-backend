module.exports = {
  HOST: "localhost",
  USER: "phpmyadmin",
  PASSWORD: "12345678",
  DB: "bedroom_stories",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
