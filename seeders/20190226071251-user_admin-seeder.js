'use strict';
// const helper = require('../helper/helper')
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync('rahasia', 10);
    return queryInterface.bulkInsert('Users', [{
      username: 'sigit',
      email: 'sigitnugroho88@gmail.com',
      password: password,
      // password: helper.encrypt('admin'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },


  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};