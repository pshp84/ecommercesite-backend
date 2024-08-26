"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          id: 1,
          name: "Raw Fish",
          description: "Fresh salmon fish, perfect for sushi.",
          price: 12.99,
          quantity: 50,
          brand: "OceanFresh",
          weight: "500g",
          dimensions: "10 x 5 x 3 inches",
          material: "Fresh Salmon",
          rating: 4.7,
          reviews: 85,
          image:
            "https://img.freepik.com/free-photo/flat-lay-delicious-seafood-arrangement_23-2148926763.jpg?t=st=1724406750~exp=1724410350~hmac=3f58118a9ac69c5bd758dbdc06c11d6860e4bfcdd2b7a464440ed728fe40ef17&w=826",
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Apple iPhone 13",
          description: "Latest model of iPhone with 128GB storage.",
          price: 999.99,
          quantity: 25,
          brand: "Apple",
          weight: "174g",
          dimensions: "5.78 x 2.82 x 0.30 inches",
          material: "Aluminum, Glass",
          rating: 4.8,
          reviews: 215,
          image:
            "https://img.freepik.com/premium-photo/newly-released-iphone-14-pro-max-mockup-set-with-back-front-angles_1073075-622.jpg?w=740",
          category_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "Nike Running Shoes",
          description: "Comfortable and durable running shoes.",
          price: 89.99,
          quantity: 100,
          brand: "Nike",
          weight: "600g",
          dimensions: "11 x 4 x 7 inches",
          material: "Synthetic",
          rating: 4.5,
          reviews: 340,
          image:
            "https://img.freepik.com/premium-photo/pair-nike-shoes-with-nike-logo-side_1149252-24.jpg",
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: "Leather Wallet",
          description: "Premium leather wallet for men.",
          price: 49.99,
          quantity: 75,
          brand: "LeatherWorks",
          weight: "200g",
          dimensions: "4.5 x 3.5 x 0.6 inches",
          material: "Genuine Leather",
          rating: 4.6,
          reviews: 122,
          image:
            "https://img.freepik.com/premium-photo/dark-brown-leather-wallet-isolated-transparent-background_971166-92763.jpg?w=740",
          category_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: "Organic Honey",
          description: "Natural organic honey, 500g jar.",
          price: 15.99,
          quantity: 150,
          brand: "Nature's Nectar",
          weight: "500g",
          dimensions: "6 x 3 x 3 inches",
          material: "Organic Honey",
          rating: 4.9,
          reviews: 195,
          image:
            "https://img.freepik.com/premium-photo/natural-organic-honey-jar-honey-dipper-honeycombs-are-near-natural-food-background_1205263-20348.jpg?w=740",
          category_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
