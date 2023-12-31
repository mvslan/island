const Router = require("koa-router");
const { User } = require("../../models/user");
const {
  TokenValidator,
  NotEmptyValidator,
} = require("../../validator/validator");
const { LoginType } = require("../../lib/enum");
const { Auth } = require("../../../middlewares/auth");
const { generateToken } = require("../../../core/util");
const { WXManager } = require('../../services/wx')

const router = new Router({
  prefix: "/v1/token",
});

router.get("/", async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx);
  let token;
  switch (v.get("query.type")) {
    case LoginType.USER_EMAIL:
      token = await getToken(v.get("query.account"), v.get("query.secret"));
      break;

    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(v.get('query.account'))
      break;

    default:
      break;
  }
  ctx.body = {
    token,
  };
});

router.post("/verify", async (ctx, next) => {
  const v = await new NotEmptyValidator().validate(ctx)
  const result = await Auth.verifyToken(v.get('body.token'))
  console.log(3, result)
  ctx.body = {
    result
  }
});

const getToken = async (account, secret) => {
  const user = await User.verifyEmailPassword(account, secret);
  const token = generateToken(user.id, Auth.USER);
  return token;
};

module.exports = router;
