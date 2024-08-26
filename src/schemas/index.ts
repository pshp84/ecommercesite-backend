import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    brand: String!
    weight: String!
    dimensions: String!
    material: String!
    rating: Float!
    reviews: Int!
    image: String!
    category: Category!
  }

  type PaginatedProducts {
    products: [Product!]!
    totalItems: Int!
    totalPages: Int!
    currentPage: Int!
  }

  type CartItem {
    id: ID!
    quantity: Int!
    session_id: String!
    product: Product!
  }

  type Category {
    id: Int!
    name: String!
  }

  type Query {
    getProducts(search: String, page: Int, pageSize: Int, categoryId: Int): PaginatedProducts!
    getProductById(id: ID!): Product
    getCart(session_id: String!): [CartItem]
    getCategory: [Category!]!
  }

  type Mutation {
    addToCart(product_id: Int!, quantity: Int!, session_id: String!): CartItem
    updateCartItem(id: ID!, quantity: Int!): CartItem
    removeFromCart(id: ID!): CartItem
    clearCart(sessionId: String!): Boolean
  }
`;

export default typeDefs;
