const { ApiException } = require("../core/http-exception");

const errCatch = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // 已知异常
    const isHttpException = err instanceof ApiException;

    if (global.config.environment === "dev" && !isHttpException) {
      throw err;
    }

    if (isHttpException) {
      console.log(233, err);
      ctx.body = {
        msg: err.msg,
        errorCode: err.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = err.code;
    } else {
      ctx.body = {
        msg: "未知错误,over",
        error_code: 999,
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = 500;
    }
  }
};

module.exports = errCatch;
