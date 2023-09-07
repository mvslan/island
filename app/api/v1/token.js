const Router = require("koa-router");
const { User } = require("../../models/user");
const {
  TokenValidator,
  NotEmptyValidator,
} = require("../../validator/validator");
const { LoginType } = require("../../lib/enum");
const { Auth } = require("../../../middlewares/auth");
const { generateToken } = require("../../../core/util");

const router = new Router({
  prefix: "/v1/token",
});

router.get("/", async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx);
  let token;
  switch (v.get("body.type")) {
    case LoginType.USER_EMAIL:
      token = await getToken(v.get("body.account"), v.get("body.secret"));
      break;

    default:
      break;
  }
  ctx.body = {
    token,
  };
});

// router.get("/verify");

const getToken = async (account, secret) => {
  const user = await User.verifyEmailPassword(account, secret);
  const token = generateToken(user.id, Auth.USER);
  return token;
};

module.exports = router;
