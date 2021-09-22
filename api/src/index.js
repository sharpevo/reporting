const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const cors = require("cors");
const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");
require("dotenv").config({
    path:
        process.env.NODE_ENV == "production"
            ? ".env.production"
            : ".env.development",
});
console.log("db:", process.env.DB_HOST);

const { graphqlUploadExpress } = require("graphql-upload");

const db = require("./db");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const port = process.env.PORT;
const DB_HOST = process.env.DB_HOST;

const app = express();
app.use(helmet());
app.use(cors());
db.connect(DB_HOST);
app.use(graphqlUploadExpress());

const getUser = (token) => {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.log(err);
            throw new Error("Session invalid");
        }
    }
};

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        uploads: false,
        playground: true,
        validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
        context: ({ req }) => {
            console.log("-----", req.body);
            const token = req.headers.authorization;
            const user = getUser(token);
            if (!user) {
                console.log("invalid user");
                //throw new Error('invalid user')
            } else {
                console.log(user);
            }
            return { models, user };
        },
    });
    await server.start();

    server.applyMiddleware({ app, path: "/api" });

    await new Promise((r) => app.listen({ port }, r));
    console.log(`🚀 Server ready at ${port}${server.graphqlPath}`);
}

startServer();
