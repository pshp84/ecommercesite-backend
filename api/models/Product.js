"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
const Category_1 = __importDefault(require("./Category"));
class Product extends sequelize_1.Model {
    id;
    name;
    description;
    price;
    quantity;
    brand;
    weight;
    dimensions;
    material;
    rating;
    reviews;
    image;
    category_id;
    createdAt;
    updatedAt;
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    brand: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    weight: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    dimensions: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    material: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    reviews: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Category_1.default,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'Products',
});
Product.belongsTo(Category_1.default, { as: 'category', foreignKey: 'category_id' });
exports.default = Product;
