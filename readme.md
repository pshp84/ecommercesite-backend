# E-Commerce Backend

This is the backend for an e-commerce platform built with Node.js, TypeScript, GraphQL, MySQL, and Sequelize. This README provides information on setting up, configuring, and running the backend server.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Database Configuration](#database-configuration)
- [Running the Project](#running-the-project)
- [Migrations and Seeders](#migrations-and-seeders)
- [GraphQL API](#graphql-api)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## Project Overview

This backend server handles:

- Product browsing and details
- Cart management
- Checkout functionality
- Advanced product search and filtering
- User session management

## Technologies Used

- **Node.js**: JavaScript runtime for the server.
- **TypeScript**: Superset of JavaScript for type safety.
- **GraphQL**: API query language.
- **MySQL**: Relational database management system.
- **Sequelize**: ORM for interacting with the MySQL database.

## Setup and Installation

### Prerequisites

- Node.js (>=14.x)
- MySQL (>=8.x)
- Yarn or npm

### Clone the Repository

```bash
git clone https://github.com/your-repo/ecommerce-backend.git
cd ecommerce-backend
```

### Install Dependencies

Install the necessary dependencies using Yarn or npm:

```bash
yarn install
# or
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DB_HOST=localhost
DB_NAME=ecommercesite
DB_USER=youruser
DB_PASSWORD=yourpassword
```

## Database Configuration

### Setup MySQL Database

1. Create a MySQL database:

   ```sql
   CREATE DATABASE ecommercesite;
   ```

2. Update the `.env` file with your MySQL database configuration.

### Migrations and Seeders

Sequelize handles database migrations and seeders. Here's how to use them:

#### Run Migrations

Migrations are used to create or modify database tables.

```bash
yarn sequelize db:migrate
# or
npx sequelize-cli db:migrate
```

#### Run Seeders

Seeders are used to populate the database with initial data.

```bash
yarn sequelize db:seed:all
# or
npx sequelize-cli db:seed:all
```

### Creating Migrations and Seeders

To create a new migration or seeder, use the following commands:

#### Create Migration

```bash
yarn sequelize migration:generate --name migration_name
# or
npx sequelize-cli migration:generate --name migration_name
```

#### Create Seeder

```bash
yarn sequelize seed:generate --name seeder_name
# or
npx sequelize-cli seed:generate --name seeder_name
```

## Running the Project

Start the server with:

```bash
yarn start
# or
npm start
```

The server will be available at `http://localhost:4000`.

## GraphQL API

The GraphQL API is accessible at `http://localhost:4000/graphql`. You can use GraphQL Playground or any GraphQL client to interact with the API.

### Example Queries and Mutations

**Query: Get Product by ID**

```graphql
query GetProductById($id: ID!) {
  getProductById(id: $id) {
    id
    name
    description
    price
    quantity
    image
    category {
      id
      name
    }
  }
}
```

**Mutation: Clear Cart**

```graphql
mutation ClearCart($sessionId: String!) {
  clearCart(sessionId: $sessionId)
}
```

## Error Handling

Errors are logged to the console and sent as responses in a structured format. Ensure proper error handling in your API calls and UI components.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
