import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database';
import Product from './Product';

class Cart extends Model {
  public id!: number;
  public product_id!: number;
  public quantity!: number;
  public session_id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    session_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'cart',
    timestamps: true,
  }
);

Cart.belongsTo(Product, { as: 'product', foreignKey: 'product_id' });

export default Cart;
