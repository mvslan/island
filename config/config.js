module.exports = {
  environment: "dev",
  database: {
    dbName: "ming",
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
  },
  security: {
    secretKey: "abcdefg",
    expiresIn: 60 * 60 * 24 * 30,
  },
};