const express = require('express');
const bodyParser = require('body-parser');
const PORT =2000;
const  { graphqlHTTP } = require('express-graphql');
//const { ApolloServer, gql } = require('apollo-server');
// const typeDefs = gql`
// type books {
//     title: String
//     author: String
//   }
//   type Query {
//     books: [books]
//   }`


 const  buildSchema = require('./app/Schema/index')
 const userResolvers = require('./app/resolver/index')
 
 
const app = express();
app.use(bodyParser.json());
// //apollo server
// const books = [
//     {
//         title: 'The Awakening',
//         author : 'Kate Chopin',
//     },
//     {
//         title: 'City of Glass',
//         author: 'Paul Auster',
//     },
//   ];
//   const resolvers = {
//     Query: {
//       books: () => books,
//     },
//   };
//   module.exports = typeDefs;
//   const server = new ApolloServer({ typeDefs, resolvers });


// Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//working of graphql

 app.use('/graphql', graphqlHTTP({
    schema: buildSchema,
  rootValue: userResolvers,
    graphiql:true
 })  
 );

app.listen(PORT ,()=>{
    console.log(`server is listening port ${PORT}`)
    });
