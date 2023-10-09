const Router = require("koa-router");
const { ApiException } = require("../../../core/http-exception");
const { PositiveIntegerValidator } = require("../../validator/validator");
const { Auth } = require("../../../middlewares/auth");
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')
const { Favor } = require('../../models/favor')

const router = new Router({
  prefix: '/v1/classic'
});

router.get("/list", new Auth().m, async (ctx, next) => {

  ctx.body = 'success'
});

router.get("/latest", new Auth().m, async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })
  const art = await Art.getData(flow.art_id, flow.type)
  const isLike = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
  // 再添一个东西，用户是否点赞这条数据
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', isLike)

  ctx.body = art
});

router.get("/:index/next", new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  })
  const flow = await Flow.findOne({
    where: {
      index: v.get('path.index') + 1
    }
  })
  if (!flow) {
    throw new global.errs.NotFundException()
  }
  const art = await Art.getData(flow.art_id, flow.type, ctx.auth.uid)
  const isLikeNext = await Favor.userLikeIt(
    flow.art_id, flow.type, ctx.auth.uid)
  // 再添一个东西，用户是否点赞这条数据
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', isLikeNext)

  ctx.body = art
});

router.get("/:index/previous", new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  })
  const flow = await Flow.findOne({
    where: {
      index: v.get('path.index') - 1
    }
  })
  if (!flow) {
    throw new global.errs.NotFundException()
  }
  const art = await Art.getData(flow.art_id, flow.type, ctx.auth.uid)
  const isLikePrevious = await Favor.userLikeIt(
    flow.art_id, flow.type, ctx.auth.uid)
  // 再添一个东西，用户是否点赞这条数据
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', isLikePrevious)

  ctx.body = art
});

module.exports = router;
