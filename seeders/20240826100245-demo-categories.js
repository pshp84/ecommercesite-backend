"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        { name: "Food", createdAt: new Date(), updatedAt: new Date() },
        { name: "Shoes", createdAt: new Date(), updatedAt: new Date() },
        { name: "Mobile", createdAt: new Date(), updatedAt: new Date() },
        { name: "Lifestyle", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Categories",
      {
        name: ["Food", "Shoes", "Mobile", "Lifestyle"],
      },
      {}
    );
  },
};
