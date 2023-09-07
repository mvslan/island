const Router = require("koa-router");

const router = new Router();

router.get("/v1/book/list", (ctx, next) => {
  ctx.body = {
    key: "book",
    list: [1, 2, 3],
  };
});

module.exports = router;
