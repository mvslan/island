const bcrypt = require("bcryptjs");

const Router = require("koa-router");
const { RegisterValidator } = require("../../validator/validator");
const { User } = require("../../models/user");

const router = new Router({
  prefix: "/v1/user",
});

router.post("/register", async (ctx) => {
  const v = await new RegisterValidator().validate(ctx);
  const salt = bcrypt.genSaltSync(1);
  const psw = bcrypt.hashSync(v.get("body.password1"), salt);

  const newUser = {
    nickname: v.get("body.nickname"),
    email: v.get("body.email"),
    password: psw,
  };
  const user = await User.create(newUser);
  ctx.body = user;
});

module.exports = router;
