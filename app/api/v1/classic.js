const Router = require("koa-router");
const { ApiException } = require("../../../core/http-exception");
const { PositiveIntegerValidator } = require("../../validator/validator");
const { Auth } = require("../../../middlewares/auth");

const router = new Router();

router.post("/v1/:id/classic/list", new Auth().m, async (ctx, next) => {
  const params = ctx.params;
  const body = ctx.request.body;
  const header = ctx.request.header;
  const query = ctx.request.query;

  const v = new PositiveIntegerValidator().validate(ctx);
  ctx.body = "success";
});

module.exports = router;
