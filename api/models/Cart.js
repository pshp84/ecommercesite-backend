"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
const Product_1 = __importDefault(require("./Product"));
class Cart extends sequelize_1.Model {
    id;
    product_id;
    quantity;
    session_id;
    createdAt;
    updatedAt;
}
Cart.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product_1.default,
            key: 'id',
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    session_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Cart',
    tableName: 'cart',
    timestamps: true,
});
Cart.belongsTo(Product_1.default, { as: 'product', foreignKey: 'product_id' });
exports.default = Cart;
