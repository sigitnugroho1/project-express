'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});

  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Item, { through: 'Transaction' })
  };
  return User;
};