"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Product_1 = __importDefault(require("../models/Product"));
const Cart_1 = __importDefault(require("../models/Cart"));
const Category_1 = __importDefault(require("../models/Category"));
const resolvers = {
    Query: {
        async getProducts(_, { search = '', page = 1, pageSize = 10, categoryId }) {
            const offset = (page - 1) * pageSize;
            let where = {};
            if (search) {
                const searchTerms = search.split(' ').map((term) => `%${term}%`);
                where[sequelize_1.Op.or] = [
                    ...searchTerms.map((term) => ({
                        [sequelize_1.Op.or]: [
                            { name: { [sequelize_1.Op.like]: term } }
                        ]
                    }))
                ];
            }
            if (categoryId) {
                where['category_id'] = categoryId;
            }
            const { rows: products, count: totalItems } = await Product_1.default.findAndCountAll({
                where,
                limit: pageSize,
                offset,
            });
            const totalPages = Math.ceil(totalItems / pageSize);
            return {
                products: JSON.parse(JSON.stringify(products)),
                totalItems,
                totalPages,
                currentPage: page,
            };
        },
        async getProductById(_, { id }) {
            return JSON.parse(JSON.stringify(await Product_1.default.findByPk(id, {
                include: [
                    {
                        model: Category_1.default,
                        as: 'category'
                    }
                ]
            })));
        },
        async getCart(_, { session_id }) {
            const cartItems = await Cart_1.default.findAll({
                where: { session_id },
                include: [
                    {
                        model: Product_1.default,
                        as: 'product'
                    }
                ]
            });
            return JSON.parse(JSON.stringify(cartItems));
        },
        async getCategory() {
            return JSON.parse(JSON.stringify(await Category_1.default.findAll({})));
        },
    },
    Mutation: {
        async addToCart(_, { product_id, quantity, session_id }) {
            const product = await Product_1.default.findByPk(product_id);
            if (!product) {
                throw new Error('Product not found');
            }
            let cartItem = await Cart_1.default.findOne({
                where: { product_id, session_id },
            });
            if (cartItem) {
                cartItem.quantity = quantity;
                await cartItem.save();
            }
            else {
                cartItem = await Cart_1.default.create({
                    product_id,
                    quantity,
                    session_id,
                });
            }
            const cartItemWithProduct = await Cart_1.default.findByPk(cartItem.id, {
                include: [
                    {
                        model: Product_1.default,
                        as: 'product'
                    }
                ]
            });
            return JSON.parse(JSON.stringify(cartItemWithProduct));
        },
        async updateCartItem(_, { id, quantity }) {
            await Cart_1.default.update({ quantity }, {
                where: {
                    id
                },
            });
            const cartItem = await Cart_1.default.findByPk(id, {
                include: [
                    {
                        model: Product_1.default,
                        as: 'product'
                    }
                ]
            });
            if (!cartItem) {
                throw new Error('Cart item not found');
            }
            return JSON.parse(JSON.stringify(cartItem));
        },
        async removeFromCart(_, { id }) {
            const cartItem = await Cart_1.default.findByPk(id);
            if (!cartItem) {
                throw new Error('Cart item not found');
            }
            cartItem.destroy();
            return JSON.parse(JSON.stringify(cartItem));
        },
        async clearCart(_, { sessionId }) {
            try {
                await Cart_1.default.destroy({ where: { session_id: sessionId } });
                return true;
            }
            catch (error) {
                console.error('Error clearing cart:', error);
                return false;
            }
        },
    },
};
exports.default = resolvers;
