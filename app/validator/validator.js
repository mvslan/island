const { Rule, LinValidator } = require("../../core/lin-validator-v2");
const { User } = require("../models/user");
const { LoginType } = require("../lib/enum");

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule("isInt", "需要是正整数", { min: 1, max: 32 })];
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.password1 = [
      new Rule("isLength", "密码长度6到32,!", {
        min: 6,
        max: 32,
      }),
      new Rule(
        "matches",
        "密码不符合规范----",
        "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]"
      ),
    ];

    this.email = [new Rule("isEmail", "不符合邮箱规则哦，改一下")];

    this.nickname = [
      new Rule("isLength", "长度搞到4到32个", {
        min: 4,
        max: 32,
      }),
    ];
    this.password2 = this.password2;
  }

  validatePassword(vals) {
    const password1 = vals.body.password1;
    const password2 = vals.body.password2;
    if (password1 !== password2) {
      throw Error("两个密码必须一致,gogogo");
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      throw Error("email已经存在");
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super();
    // 用户名存在，密码可能没有，type要存在
    this.account = [
      new Rule("isLength", "account需要存在且长度正确", { min: 4, max: 32 }),
    ];
    this.secret = [
      new Rule("isOptional"),
      new Rule("isLength", "密码要6到32个字符", { min: 4, max: 32 }),
    ];
  }
  validateType(vals) {
    if (!vals.body.type) {
      throw new Error("type必须填写");
    }
    console.log(3, vals.body);
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error("type参数不合法!");
    }
  }
}

class NotEmptyValidator extends LinValidator {
  constructor() {
    super();
    this.token = [
      new Rule("isLength", "不允许为空", {
        min: 1,
      }),
    ];
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
};
