import { Op } from 'sequelize';
import Product from '../models/Product';
import Cart from '../models/Cart';
import Category from '../models/Category';
const resolvers = {
  Query: {
    async getProducts(_: any, { search = '', page = 1, pageSize = 10, categoryId }: any) {
      const offset = (page - 1) * pageSize;
      let where: any = {}
      if (search) {
        const searchTerms = search.split(' ').map((term: string) => `%${term}%`);
        where[Op.or] = [
          ...searchTerms.map((term: string) => ({
            [Op.or]: [
              { name: { [Op.like]: term } },
              { description: { [Op.like]: term } }
            ]
          }))
        ];
      }

      if (categoryId) {
        where['category_id'] = categoryId
      }

      const { rows: products, count: totalItems } = await Product.findAndCountAll({
        where,
        limit: pageSize,
        offset,
      });

      const totalPages = Math.ceil(totalItems / pageSize);

      return {
        products,
        totalItems,
        totalPages,
        currentPage: page,
      };
    },

    async getProductById(_: any, { id }: any) {
      return await Product.findByPk(id, {
        include: [
          {
            model: Category,
            as: 'category'
          }
        ]
      });
    },

    async getCart(_: any, { session_id }: any) {
      const cartItems = await Cart.findAll({
        where: { session_id },
        include: [
          {
            model: Product,
            as: 'product'
          }
        ]
      });

      return cartItems;
    },

    async getCategory() {
      return Category.findAll({});
    },
  },

  Mutation: {
    async addToCart(_: any, { product_id, quantity, session_id }: any) {
      const product = await Product.findByPk(product_id);
      if (!product) {
        throw new Error('Product not found');
      }

      let cartItem = await Cart.findOne({
        where: { product_id, session_id },
      });

      if (cartItem) {
        cartItem.quantity = quantity;
        await cartItem.save();
      } else {
        cartItem = await Cart.create({
          product_id,
          quantity,
          session_id,
        });
      }
      const cartItemWithProduct = await Cart.findByPk(cartItem.id, {
        include: [
          {
            model: Product,
            as: 'product'
          }
        ]
      });
      return cartItemWithProduct;
    },

    async updateCartItem(_: any, { id, quantity }: any) {
      const cartItem = await Cart.findByPk(id, {
        include: [
          {
            model: Product,
            as: 'product'
          }
        ]
      });
      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      cartItem.quantity = quantity;
      await cartItem.save();
      return cartItem;
    },

    async removeFromCart(_: any, { id }: any) {
      const cartItem = await Cart.findByPk(id);
      if (!cartItem) {
        throw new Error('Cart item not found');
      }
      cartItem.destroy();
      return cartItem;
    },

    async clearCart(_: any, { sessionId }: { sessionId: string }) {
      try {
        await Cart.destroy({ where: { session_id: sessionId } });
        return true;
      } catch (error) {
        console.error('Error clearing cart:', error);
        return false;
      }
    },
  },
};

export default resolvers;
