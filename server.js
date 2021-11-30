const { ApolloServer } = require('apollo-server-express');
const graphqlSchema = require('./app/graphql/schema/index');
const graphqlResolver = require('./app/graphql/resolvers/index');
const dbConfig = require('./config/database.config');
const express = require('express');
const isAuth = require('./app/utilities/middleware/is-auth');
require('./app/utilities/socialAuthentication/passport-setup')

require('dotenv').config();

//establishing database connection
dbConfig.dbConnection();
async function startserver(){

//creating ApolloServer and declaring schemas,resolvers and context in it
const server = new ApolloServer({

  typeDefs: graphqlSchema,
  resolvers: graphqlResolver,
  context: isAuth
});

//storing express in app
const app = express();

require("./app/routes/googleroutes/google.routes")(app)

//apply express middlewar

await server.start()
server.applyMiddleware({ app,path:"/graphql" });



// listen on port 3000 for incoming requests
app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 2000');
});
}
startserver()
