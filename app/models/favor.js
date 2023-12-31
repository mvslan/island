const { sequelize } = require('../../core/db')
const { Model, Sequelize } = require('sequelize')
const {
  Art
} = require('./art')


class Favor extends Model {
  static async like(art_id, type, uid) {
    // 找到是否有这条数据
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })

    if (favor) {
      throw new global.errs.LikeError()
    }

    // 一定要把结果return回去
    return sequelize.transaction(async t => {
      await Favor.create({
        art_id,
        type,
        uid
      }, { transaction: t })
      const art = await Art.getData(art_id, type)
      await art.increment('fav_nums', {
        by: 1,
        transaction: t
      })
    })
  }

  static async dislike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })

    if (!favor) {
      throw new global.errs.DislikeError()
    }

    // 一定要把结果return回去
    return sequelize.transaction(async t => {
      await favor.destroy({
        force: true,
        transaction: t
      })
      const art = await Art.getData(art_id, type)
      await art.decrement('fav_nums', {
        by: 1,
        transaction: t
      })
    })
  }

  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    return favor ? true : false
  }
}

Favor.init({
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
  uid: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'favor'
})

module.exports = {
  Favor
}