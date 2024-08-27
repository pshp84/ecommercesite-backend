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
              { name: { [Op.like]: term } }
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
        products: JSON.parse(JSON.stringify(products)),
        totalItems,
        totalPages,
        currentPage: page,
      };
    },

    async getProductById(_: any, { id }: any) {
      return JSON.parse(JSON.stringify(await Product.findByPk(id, {
        include: [
          {
            model: Category,
            as: 'category'
          }
        ]
      })));
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

      return JSON.parse(JSON.stringify(cartItems));
    },

    async getCategory() {
      return JSON.parse(JSON.stringify(await Category.findAll({})));
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
      return JSON.parse(JSON.stringify(cartItemWithProduct));
    },

    async updateCartItem(_: any, { id, quantity }: any) {
      await Cart.update(
        { quantity },
        {
          where: {
            id
          },
        });

      const cartItem = await Cart.findByPk(id, {
        include: [
          {
            model: Product,
            as: 'product'
          }
        ]
      })

      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      return JSON.parse(JSON.stringify(cartItem));
    },

    async removeFromCart(_: any, { id }: any) {
      const cartItem = await Cart.findByPk(id);
      if (!cartItem) {
        throw new Error('Cart item not found');
      }
      cartItem.destroy();
      return JSON.parse(JSON.stringify(cartItem));
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
