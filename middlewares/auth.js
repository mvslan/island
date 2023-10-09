const basicAuth = require("basic-auth");
const jwt = require("jsonwebtoken");

class Auth {
  constructor(level) {
    this.level = level | 1;
    Auth.USER = 8;
    Auth.ADMIN = 16;
    Auth.SUPER_ADMIN = 32;
  }
  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req);
      if (!userToken || !userToken.name) {
        throw new global.errs.AuthForbiddenException();
      }
      let errMsg = "token不合法";
      let decode;

      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey);
      } catch (err) {
        if (err.name == "TokenExpiredError") {
          errMsg = "token已过期";
        }
        console.log(2, errMsg, decode)

        throw new global.errs.AuthForbiddenException(errMsg);
      }
      if (decode.scope < this.level) {
        errMsg = '权限不足，你的战斗力还不够哦'
        throw new global.errs.AuthForbiddenException(errMsg)
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      };
      await next()
    };
  }

  static async verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true

    } catch (err) {
      console.log(err)
      return false
    }

  }
}

module.exports = {
  Auth,
};
