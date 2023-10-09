/* 
  业务模型，连接classic和art
   art: classic,book
   classic: movie,sentence,music
*/
const { sequelize } = require('../../core/db')
const { Model, Sequelize } = require('sequelize')

class Flow extends Model {

}

Flow.init({
  // 期刊序号
  index: Sequelize.INTEGER,
  // 对应classic表的id
  art_id: Sequelize.INTEGER,
  // movie,music,sentence
  type: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'flow'
})

module.exports = {
  Flow
}
