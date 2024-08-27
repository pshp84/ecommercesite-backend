"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const database_1 = __importDefault(require("./utils/database"));
const schemas_1 = __importDefault(require("./schemas"));
const resolvers_1 = __importDefault(require("./resolvers"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(express_1.default.json());
const httpServer = http_1.default.createServer(app);
const startApolloServer = async (app, httpServer) => {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: schemas_1.default,
        resolvers: resolvers_1.default,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        cache: "bounded",
        persistedQueries: false
    });
    await server.start();
    server.applyMiddleware({ app });
    await database_1.default.sync({ alter: true });
    console.log('Database synced');
    app.listen({ port: 4000 }, () => console.log(`Server ready at http://localhost:4000${server.graphqlPath}`));
};
startApolloServer(app, httpServer);
exports.default = httpServer;
