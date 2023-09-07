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
        if (error.name == "TokenExpiredError") {
          errMsg = "token已过期";
        }
        throw new global.errs.AuthForbiddenException(errMsg);
      }
      console.log(5, decode.scope);
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      };
    };
  }
}

module.exports = {
  Auth,
};
