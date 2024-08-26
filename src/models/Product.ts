import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';
import Category from './Category';

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  brand?: string;
  weight?: string;
  dimensions?: string;
  material?: string;
  rating?: number;
  reviews?: number;
  image?: string;
  category_id?: number,
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }

class Product extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public quantity!: number;
  public brand?: string;
  public weight?: string;
  public dimensions?: string;
  public material?: string;
  public rating?: number;
  public reviews?: number;
  public image?: string;
  public category_id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dimensions: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  material: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  reviews: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Products',
});

Product.belongsTo(Category, { as: 'category', foreignKey: 'category_id' })

export default Product;
