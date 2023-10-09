module.exports = {
  environment: "dev",
  database: {
    dbName: "ming",
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345678",
  },
  security: {
    secretKey: "abcdefg",
    expiresIn: 60 * 60 * 24 * 30,
  },
  wx: {
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
    appId: "wx7749fa1017791e78",
    appSecret: "821d3e848da6cfde7c6cc7199d29391e"
  }
};
