class ApiException extends Error {
  constructor(msg = "发现异常了", errorCode = 10001, code = 400) {
    super();
    this.msg = msg;
    this.code = code;
    this.errorCode = errorCode;
  }
}

class ParameterException extends ApiException {
  constructor(msg = "参数错误", errorCode = 10000, code = 400) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    this.code = code;
  }
}

class NotFundException extends ApiException {
  constructor(msg = "用户未找到", errorCode = 10002, code = 404) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    this.code = code;
  }
}

class AuthFailedException extends ApiException {
  constructor(msg = "授权失败", errorCode = 10004, code = 401) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    this.code = code;
  }
}

class AuthForbiddenException extends ApiException {
  constructor(msg = "没得权限", errorCode = 10006, code = 403) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    this.code = code;
  }
}

module.exports = {
  ApiException,
  ParameterException,
  NotFundException,
  AuthFailedException,
  AuthForbiddenException,
};
