'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'roleId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Roles",
        key: "id",
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'roleId')
  }
};
