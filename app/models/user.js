const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");

const { sequelize } = require("../../core/db");
const bcryptjs = require("bcryptjs");

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new global.errs.NotFundException();
    }
    const correct = bcrypt.compareSync(plainPassword, user.password);
    if (!correct) {
      throw new global.errs.AuthFailedException("用户不存在");
    }
    return user;
  }

  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }

  static async registerByOpenid(openid) {
    return await User.create({
      openid
    })
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    openid: {
      type: Sequelize.STRING(64),
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
  }
);
module.exports = {
  User,
};

// const Ueer = sequelize.define("user", {
//   email: Sequelize.STRING,
//   nickname: Sequelize.STRING,
//   openid: {
//     type: Sequelize.STRING(64),
//     unique: true,
//   },
//   password: {
//     type: Sequelize.STRING,
//     set(val) {
//       const salt = bcryptjs.genSaltSync(10),
//       const hash = bcryptjs.hashSync(val, salt)
//       this.setDataValue('password',hash)
//     }
//   },
// });

// sequelize库的缺点？？？
