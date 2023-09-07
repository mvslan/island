const { Sequelize } = require("sequelize");

const { dbName, host, port, user, password } =
  require("../config/config").database;

const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  // 打印sql执行内容
  // logging: true,
  // 北京时间
  timezone: "+08:00",
  define: {
    // 不生成createAt,updateAt
    timestamps: true,
    // deleteAt
    paranoid: true,
    // 驼峰改成下划线
    underscored: true,
  },
});

// 创建数据库实例!!!
sequelize.sync({
  // 强制删除并重新创建表
  force: false,
});

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("okok");
//   } catch (err) {
//     console.log(33, err);
//   }
// })();

module.exports = {
  sequelize,
};
