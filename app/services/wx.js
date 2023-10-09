const util = require('util')
const axios = require('axios')

const { User } = require('../models/user')
const Auth = require('../../middlewares/auth')
const { generateToken } = require('../../core/util')

class WXManager {
  static async codeToToken(code) {
    const url = util.format(global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code
    )
    const res = await axios.get(url)
    if (res.status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败')
    }
    const errcode = res.data.errcode
    const errmsg = res.data.errmsg
    if (errmsg) {
      throw new global.errs.AuthFailed('openid获取失败:' + errmsg)
    }
    let user = await User.getUserByOpenid(res.data.openid)
    if (!user) {
      user = await User.registerByOpenid(res.data.openid)
    }
    return generateToken(user.id, Auth.User)
  }
}

module.exports = {
  WXManager
}