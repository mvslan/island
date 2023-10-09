const Router = require("koa-router");
const { Auth } = require("../../../middlewares/auth");
const { LikeValidator } = require('../../validator/validator')
const { Favor } = require('@/app/models/favor')

const router = new Router({
  prefix: "/v1/like",
});

router.post('/', new Auth().m, async (ctx, next) => {
  // 第二个参数可以修改别名
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  })
  const favor = await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  ctx.body = 'success'
})

router.post('/cancel', new Auth().m, async (ctx, next) => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  })
  const favor = await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  ctx.body = 'success'
})


module.exports = router;
